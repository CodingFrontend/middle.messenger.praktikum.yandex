import Block from "@/core/block";
import { IconButton } from "@/components";

interface ButtonProps {
	onClick?: () => void;
}

export default class GoBack extends Block {
	constructor(props: ButtonProps) {
		super("div", {
			classList: "go-back",
			IconButton: new IconButton({
				faIcon: "fa-solid fa-arrow-left",
				type: "primary",
				onClick: props?.onClick,
			}),
		});
	}

	public render(): string {
		return `
			<div class="go-back__button">
				{{{ IconButton }}}
			</div>
    `;
	}
}
