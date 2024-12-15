import Block from "@/core/block";

interface InputFieldProps {
	name: string;
	onBlur: (e: Event) => void;
}

export default class CustomInputField extends Block {
	constructor(props: InputFieldProps) {
		super("input", {
			...props,
			classList: "send-message-input",
			attrs: {
				autocomplete: "off",
				placeholder: "Сообщение",
			},
			events: {
				blur: props.onBlur,
			},
		});
	}

	public value() {
		return this.getContent().value;
	}
}
