import Block from '@/src/core/block';

export interface ILinkButtonProps {
  link: string;
  type?: string;
  iconLeft?: string;
  iconRight?: string;
  onClick?: (e: Event) => void;
}

export default class LinkButton extends Block {
  constructor(props: ILinkButtonProps) {
    super('div', {
      ...props,
      classList: `icon-text-button icon-text-button--${props.type}`,
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
				<span class='icon-text-button__icon'>
					<i class='{{iconLeft}}'></i>
				</span>
			{{/if}}
			<span class='icon-text-button__label'>{{label}}</span>
			{{#if iconRight}}
				<span class='icon-text-button__icon'>
					<i class='{{iconRight}}'></i>
				</span>
			{{/if}}
    `;
  }
}
