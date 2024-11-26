import Block from '@/core/block';

type IconButtonProps = {
  faIcon: string;
  type?: string;
  onClick?: (e: Event) => void;
};

export default class LinkButton extends Block {
  constructor(props: IconButtonProps) {
    super('a', {
      ...props,
      classList: `icon-button icon-button--${props.type}`,
      events: {
        mousedown: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      <button class='icon-button icon-button--{{type}}'>
				<i class='{{faIcon}}'></i>
			</button>
    `;
  }
}
