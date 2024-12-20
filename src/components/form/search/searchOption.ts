import Block from "@/core/block";

interface SearchOptionProps {
	value: number;
	onSelect?: (id: number) => void;
}

export default class SearchOption extends Block {
	constructor(props: SearchOptionProps) {
		super("option", {
			...props,
			classList: "select-option-item",
			attrs: {
				value: props.value || "",
			},
			events: {
				click: () => {
					if (props?.onSelect) props.onSelect(props.value);
				},
			},
		});
	}
}
