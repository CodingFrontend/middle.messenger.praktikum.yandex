import Block from "@/core/block";
import InputField from "@/components/form/input/inputField";

interface InputProps {
	label: string;
	name: string;
	type: string;
	error?: string;
	id?: string | number;
	list?: string;
	onChange?: (e: Event) => void;
	onBlur?: (e: Event) => void;
	onKeydown?: (e: Event) => void;
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
				list: props.list,
				onChange: props.onChange,
				onBlur: props.onBlur,
				onKeydown: props.onKeydown,
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
