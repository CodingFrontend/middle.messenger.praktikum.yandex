import Block from "@/core/block";

interface InputFieldProps {
	name: string;
	type: string;
	id?: string | number;
	error?: string;
	list?: string;
	value?: any;
	onChange?: (e: Event) => void;
	onBlur?: (e: Event) => void;
	onKeydown?: (e: Event) => void;
}

export default class InputField extends Block {
	constructor(props: InputFieldProps) {
		super("input", {
			...props,
			attrs: {
				autocomplete: "off",
				placeholder: "",
				type: props.type,
				list: props.list,
				value: props.value || "",
			},
			events: {
				change: props.onChange,
				blur: props.onBlur,
				keydown: props.onKeydown,
			},
			classList: `${props.error ? "input__field-error" : ""}`,
		});
	}
}

