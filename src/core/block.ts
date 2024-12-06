import EventBus from "./eventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

interface BlockConsturctor extends Block {
	new (name: string): { props: IProps };
}
type TTageName = string;
type TChildren = Record<string, BlockConsturctor>;
type TEvents = Record<string, EventListenerOrEventListenerObject>;

interface IMeta {
	tagName?: TTageName;
	props?: IProps;
}
interface IProps<V = TChildren | string | boolean | any> {
	[key: string]: V;
}

export default class Block {
	public eventBus: Function;
	public children: TChildren;
	public props: IProps;

	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_CDUM: "flow:component-did-unmount",
		FLOW_RENDER: "flow:render",
	};

	private _element: unknown = null;
	private _meta: IMeta | null = null;
	protected _id: string = nanoid(6);

	constructor(tagName: TTageName = "div", propsWithChildren: IProps = {}) {
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

	private _registerEvents(eventBus: EventBus<string>) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDUM, this._componentDidUnmount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName, props } = this._meta as IMeta;
		if (tagName) this._element = this._createDocumentElement(tagName);
		if (typeof props?.classList === "string" && props.classList) {
			const classes = props.classList.split(" ");
			(this._element as HTMLElement)?.classList.add(...classes);
		}

		if (typeof props?.attrs === "object") {
			Object.entries(props.attrs as Record<string, string>).forEach(
				([attrName, attrValue]) => {
					(this._element as HTMLElement)?.setAttribute(
						attrName,
						attrValue as string
					);
				}
			);
		}
	}

	public init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _getChildrenAndProps(propsWithChildren: IProps) {
		const children: TChildren = {};
		const props: IProps = {};

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((obj) => {
					if (obj instanceof Block) {
						children[key] = value as unknown as BlockConsturctor;
					} else {
						props[key] = value;
					}
				});

				return;
			}

			if (value instanceof Block) {
				{
					children[key] = value as BlockConsturctor;
				}
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	private _componentDidMount() {
		this.componentDidMount();
	}

	public componentDidMount() {}

	private _componentDidUnmount() {
		this._removeEvents();
	}

	public dispatchComponentDidUnmount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDUM);
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}

		this._render();
	}

	public componentDidUpdate(oldProps: IProps, newProps: IProps) {
		console.log(oldProps, newProps);
		return true;
	}

	public forceUpdate() {
		this._render();
	}

	public setProps = (nextProps: IProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	public setChild = (child: unknown) => {
		Object.assign(this.children, child);
	};

	get element() {
		return this._element;
	}

	private _addEvents() {
		const { events = {} } = this.props as IProps<TEvents>;

		Object.keys(events).forEach((eventName: string) => {
			(this._element as HTMLElement)?.addEventListener(
				eventName,
				events[eventName]
			);
		});
	}

	private _removeEvents() {
		const { events = {} } = this.props as IProps<TEvents>;

		Object.keys(events).forEach((eventName: string) => {
			(this._element as HTMLElement)?.removeEventListener(
				eventName,
				events[eventName]
			);
		});
	}

	private _compile(): DocumentFragment {
		const propsAndStubs = { ...this.props };
		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				propsAndStubs[key] = child.map(
					(component: Block): string => `<div data-id="${component._id}"></div>`
				);
			} else {
				propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
			}
		});
		const fragment: HTMLElement = this._createDocumentElement("template");
		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template(propsAndStubs);
		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((component: Block) => {
					if (fragment instanceof HTMLTemplateElement) {
						const stub = fragment.content.querySelector(
							`[data-id="${component._id}"]`
						);

						stub?.replaceWith(component.getContent());
					}
				});
			} else {
				if (fragment instanceof HTMLTemplateElement) {
					const stub = fragment.content.querySelector(
						`[data-id="${child._id}"]`
					);
					stub?.replaceWith(child.getContent());
				}
			}
		});
		return (fragment as HTMLTemplateElement).content;
	}

	private _render() {
		this._removeEvents();
		const block = this._compile();

		if ((this._element as HTMLElement)?.children.length === 0) {
			(this._element as HTMLElement)?.appendChild(block);
		} else {
			(this._element as HTMLElement)?.replaceChildren(block);
		}

		this._addEvents();
	}

	public render() {
		return "";
	}

	public getContent(): string | Node {
		return this._element as string | Node;
	}

	private _makePropsProxy(props: IProps) {
		const eventBus = this.eventBus();
		const emitBind = eventBus.emit.bind(eventBus);

		return new Proxy(props as any, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldTarget = { ...target };
				target[prop] = value;

				emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});
	}

	private _createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	public show() {
		(this.getContent() as HTMLElement).style.display = "block";
	}

	public hide() {
		(this.getContent() as HTMLElement).style.display = "none";
	}
}
