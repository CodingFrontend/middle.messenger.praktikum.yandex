import Block from '@/src/core/block';

export interface ILinkButtonProps {
  label: string;
  link?: string;
  type?: string;
  iconLeft?: string;
  iconRight?: string;
  onClick?: (e: Event) => void;
}

export default class LinkButton extends Block {
  constructor(props: ILinkButtonProps) {
    super('a', {
      ...props,
      classList: `link-button link-button--${props.type}`,
      attrs: {
        href: props.link,
      },
      events: {
        mousedown: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      {{#if iconLeft}}
				<span class='link-button__icon'>
					<i class='{{iconLeft}}'></i>
				</span>
			{{/if}}
			<span class='link-button__label'>{{label}}</span>
			{{#if iconRight}}
				<span class='link-button__icon'>
					<i class='{{iconRight}}'></i>
				</span>
			{{/if}}
    `;
  }
}
