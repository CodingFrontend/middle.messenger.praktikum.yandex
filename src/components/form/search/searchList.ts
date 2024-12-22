import Block from "@/core/block";
import SearchOption, { IOption } from "./searchOption";

export interface ISearchListProps {
	id: string;
	open?: boolean;
	options: IOption[] | [];
	onSelect?: (option: IOption) => void;
}

class SearchList extends Block {
	constructor(props: ISearchListProps) {
		super("div", {
			...props,
			classList: "search-list",
			open: true,
			attrs: {
				id: props.id,
			},
		});
	}

	public componentDidUpdate(
		oldProps: ISearchListProps,
		newProps: ISearchListProps
	): boolean {
		if (newProps.options && newProps.options !== oldProps.options) {
			this.setChild({
				searchOptions: newProps.options.map(
					(option) =>
						new SearchOption({
							value: option.value,
							label: option.label,
							onSelect: (option: IOption) => {
								if ((this.props as ISearchListProps)?.onSelect)
									(this.props as ISearchListProps).onSelect?.(option);
							},
						})
				),
			});
		}

		return true;
	}

	public render() {
		return `
			{{#if ${
				(this.props as ISearchListProps).open &&
				(this.props as ISearchListProps).options &&
				(this.props as ISearchListProps).options.length
			}}}
				<ul>
					{{#each searchOptions}}
						{{{ this }}}
					{{/each}}
				</ul>
			{{else if error}}
				<p class="search-list__error">{{error}}</p>
			{{else if ${
				!(this.props as ISearchListProps).open ||
				!(this.props as ISearchListProps).options ||
				!(this.props as ISearchListProps).options.length
			}}}
				<p class="search-list__text">Введите значение для поиска</p>
			{{/if}}
    `;
	}
}

export default SearchList;
