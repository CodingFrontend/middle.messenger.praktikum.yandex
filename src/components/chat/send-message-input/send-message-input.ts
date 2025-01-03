import Block from "@/core/block";

interface InputFieldProps {
	name: string;
	value?: string;
	onBlur?: (e: Event) => void;
	onKeyDown?: (e: KeyboardEvent) => void;
}

export default class CustomInputField extends Block {
	constructor(props: InputFieldProps) {
		super("input", {
			...props,
			classList: "send-message-input",
			attrs: {
				autocomplete: "off",
				value: props.value || "",
				placeholder: "Сообщение",
			},
			events: {
				blur: props.onBlur,
				keydown: props.onKeyDown,
			},
		});
	}

	public value() {
		return (this.getContent() as HTMLInputElement).value;
	}

	public clear() {
		(this.getContent() as HTMLInputElement).value = "";
	}
}
