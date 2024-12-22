import Block from "@/core/block";
import InputField from "@/components/form/input/inputField";
import SearchList from "./searchList";
import { IOption } from "./searchOption";

interface SearchProps {
	id: string;
	label: string;
	name: string;
	options: IOption[] | [];
	error?: string;
	clicked?: boolean;
	selectedValue?: string;
	onKeydown?: () => void;
	onSelect?: (option: IOption) => void;
}

export default class Search extends Block {
	constructor(props: SearchProps) {
		super("div", {
			...props,
			classList: "input search",
			clicked: false,
			InputField: new InputField({
				name: props.name,
				type: "text",
				error: props.error,
				list: props.id,
				value: props.selectedValue,
				onKeydown: props.onKeydown,
			}),
			SearchList: new SearchList({
				id: props.id,
				options: props.options || [],
				onSelect: (option: IOption) => {
					this.setProps({ selectedValue: option.value });
					this.children.SearchList.setProps({
						open: false,
					});
					(this.children.InputField.getContent() as HTMLInputElement).value =
						option.label;
					if (props.onSelect) props.onSelect(option);
				},
			}),
		});
	}

	public value() {
		return (this.children.InputField.getContent() as HTMLInputElement).value;
	}

	public selectedValue() {
		return (this.props as SearchProps).selectedValue;
	}

	public clear() {
		(this.children.InputField.getContent() as HTMLInputElement).value = "";
		this.setProps({ selectedValue: "", options: [] });
	}

	public componentDidUpdate(
		oldProps: SearchProps,
		newProps: SearchProps
	): boolean {
		if (newProps.options && newProps.options !== oldProps.options) {
			this.children.SearchList.setProps({
				options: newProps.options,
			});
		}

		return true;
	}

	public render(): string {
		return `
        {{{ InputField }}}
				<label for='{{name}}' class='input__label'>{{label}}</label>
				{{{SearchList}}}
    `;
	}
}
