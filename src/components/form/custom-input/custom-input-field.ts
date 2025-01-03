import Block from "@/core/block";

interface InputFieldProps {
	name: string;
	type: string;
	value: string;
	disabled?: boolean;
	error?: string;
	onChange?: (e: Event) => void;
}

export default class CustomInputField extends Block {
	constructor(props: InputFieldProps) {
		super("input", {
			...props,
			attrs: {
				autocomplete: "off",
				placeholder: "",
				value: props.value,
				type: props.type,
			},
			events: {
				change: props.onChange,
			},
			classList: `${props.error ? "custom-input__field-error" : ""}`,
		});
	}

	public render(): string {
		if ((this.props as InputFieldProps).disabled) {
			this.setAttrs("disabled");
		}
		return ``;
	}
}
