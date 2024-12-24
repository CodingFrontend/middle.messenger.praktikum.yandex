import Block from "@/core/block";

interface ButtonProps {
	label: string;
	type?: string;
	attrs?: Record<string, string>;
	isLoading?: boolean;
	onClick?: (e: Event) => void;
}

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super("button", {
			...props,
			classList: `button button--${props.type}`,
			events: {
				mousedown: props.onClick,
			},
		});
	}
	public render(): string {
		return `
      {{#if isLoading}}
				<div class="loader">
					<i class="fa-solid fa-spinner"/>
				</div>
      {{else}}
				 {{ label }}
      {{/if}}
     
    `;
	}
}
