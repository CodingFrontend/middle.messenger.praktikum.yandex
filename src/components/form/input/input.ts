import Block from "@/core/block";
import InputField from "@/components/form/input/inputField";

interface InputProps {
	label: string;
	name: string;
	type: string;
	error?: string;
	onChange?: (e: Event) => void;
	onBlur?: (e: Event) => void;
}

export default class Input extends Block {
	constructor(props: InputProps) {
		super("div", {
			...props,
			classList: "input",
			InputField: new InputField({
				name: props.name,
				type: props.type || "text",
				error: props.error,
				onChange: props.onChange,
				onBlur: props.onBlur,
			}),
		});
	}

	public value() {
		return (this.children.InputField.getContent() as HTMLInputElement).value;
	}

	public clear() {
		(this.children.InputField.getContent() as HTMLInputElement).value = "";
	}

	public render(): string {
		return `
        {{{ InputField }}}
				<label for='{{name}}' class='input__label'>{{label}}</label>
				{{#if error}}
					<span class='input__error'>{{error}}</span>
				{{/if}}
    `;
	}
}
