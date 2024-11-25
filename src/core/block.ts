import EventBus from './eventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type TObjProp = Record<string, string>;
type TProps = Record<string, string | string[] | Function | TObjProp>;
type TChildren = Record<string, string | string[] | Function>;

interface IMeta {
  tagName?: string;
  props?: TProps;
}

export default class Block {
  private eventBus: Function;
  private children: TChildren;
  private props: TProps;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;
  _meta: IMeta | null = null;
  _id = nanoid(6);

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props } = this._meta as IMeta;
    if (tagName) this._element = this._createDocumentElement(tagName);
    if (typeof props?.classList === 'string' && props.classList) {
      const classes = props.classList.split(' ');
      this._element?.classList.add(...classes);
    }

    if (typeof props?.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, attrValue);
      });
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsWithChildren: TProps) {
    const children: TChildren = {};
    const props: TProps = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj: unknown) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });

        return;
      }

      if (value instanceof Block) {
        {
          children[key] = value;
        }
      } else {
        props[key] = value;
      }
    });

    console.log('children', children);

    return { children, props };
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  forceUpdate(oldProps: TProps, newProps: TProps) {
    this._render();
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setChild = (child: TChildren) => {
    Object.assign(this.children, child);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _compile() {
    console.log(this._element, 'children', this.children);
    const propsAndStubs = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (component) => `<div data-id="${component._id}"></div>`
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });
    const fragment = this._createDocumentElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component: typeof Block) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`
          );

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });
    return fragment.content;
  }

  _render() {
    this._removeEvents();
    const block = this._compile();

    if (this._element?.children.length === 0) {
      this._element?.appendChild(block);
    } else {
      this._element?.replaceChildren(block);
    }

    this._addEvents();
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: TProps) {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props as any, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        console.log('proxy', oldTarget, target);

        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
