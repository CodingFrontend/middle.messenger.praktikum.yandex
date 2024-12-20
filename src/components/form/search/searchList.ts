import Block from "@/core/block";
import SearchOption from "@/components/form/search/searchOption";
import { Input } from "../input";

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

	public componentDidUpdate(
		oldProps: ISearchListProps,
		newProps: ISearchListProps
	): boolean {
		if (
			newProps.options &&
			newProps.options.length &&
			newProps.options !== oldProps.options
		) {
			this.setProps({
				searchOptions: newProps.options.map((option) => {
					new SearchOption({
						value: option.id,
						onSelect: (value: number) => {
							if ((this.props as ISearchListProps)?.onSelect)
								(this.props as ISearchListProps).onSelect?.(value);
						},
					});
				}),
			});

			console.log(4, newProps, this.children);
			return true;
		}

		return false;
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
