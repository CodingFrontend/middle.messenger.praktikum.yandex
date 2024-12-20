import Block from "@/core/block";
import SearchOption from "@/components/form/search/searchOption";

export interface ISearchListProps {
	options: { id: number; value: string; text: string }[] | [];
	onSelect?: (id: number) => void;
}

class SearchList extends Block {
	constructor(props: ISearchListProps) {
		super("datalist", {
			...props,
			classList: "search-list",
			searchOptions: props.options.map((option) => {
				new SearchOption({
					value: option.id,
					onSelect: (value: number) => {
						if (props?.onSelect) props.onSelect(value);
					},
				});
			}),
		});
	}

	public render() {
		console.log(5, this.props, this.children);
		return `
      {{#each searchOptions}}
				{{{ this }}}
			{{/each}}
    `;
	}
}

export default SearchList;
