import Block from '@/src/core/block';

type ButtonProps = {
  label: string;
  type?: string;
  onClick?: (e: Event) => void;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      classList: `button button--${props.type}`,
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      {{ label }}
    `;
  }
}
