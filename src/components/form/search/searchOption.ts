import Block from "@/core/block";

export interface IOption {
	value: number;
	label: string;
}

interface SearchOptionProps {
	label: string;
	value: number;
	onSelect?: (option: IOption) => void;
}

export default class SearchOption extends Block {
	constructor(props: SearchOptionProps) {
		super("li", {
			...props,
			classList: "select-option-item",
			attrs: {
				value: props.value || "",
			},
			events: {
				click: () => {
					if (props?.onSelect) props.onSelect({ ...props });
				},
			},
		});
	}

	public render() {
		return `
			{{label}}
    `;
	}
}
