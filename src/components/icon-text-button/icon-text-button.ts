import Block from '@/core/block';

export interface IIconTextButtonProps {
  label: string;
  type?: string;
  iconLeft?: string;
  iconRight?: string;
  onClick?: (e: Event) => void;
}

export default class LinkButton extends Block {
  constructor(props: IIconTextButtonProps) {
    super('div', {
      ...props,
      classList: `icon-text-button icon-text-button--${props.type}`,
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
