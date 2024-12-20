import Block from "@/core/block";
import { Input } from "@/components";
import SearchList from "./searchList";

interface SearchProps {
	id: string;
	label: string;
	name: string;
	options: { id: number; value: string; text: string }[] | [];
	error?: string;
	onKeydown?: () => void;
	onSelect?: (id: number) => void;
}

export default class Search extends Block {
	constructor(props: SearchProps) {
		super("div", {
			...props,
			classList: "search",
			Input: new Input({
				label: props.label,
				name: props.name,
				id: props.id,
				type: "text",
				error: props.error,
				onKeydown: props.onKeydown,
			}),
			SearchList: new SearchList({
				options: props.options,
				onSelect: (id: number) => {
					if (props.onSelect) props.onSelect(id);
				},
			}),
		});
	}

	public value() {
		return this.children.Input.value();
	}

	public clear() {
		(
			this.children.Input.children.InputField.getContent() as HTMLInputElement
		).value = "";
	}

	public render(): string {
		console.log(333, this.props, this.children);
		return `
        {{{ Input }}}
				 <div class="search-list">
					{{#if options}}
						<datalist id="{{id}}">
							{{{OptionsList}}}
						</datalist>  
					{{else if error}}
					<p class="search-list__error">{{error}}</p>
					{{/if}}
				</div>
    `;
	}
}
