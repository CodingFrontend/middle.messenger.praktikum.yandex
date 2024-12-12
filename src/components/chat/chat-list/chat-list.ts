import Block from "@/core/block";
import { ChatItem } from "@/components";
import type { IChatItem } from "@/components/chat/chat-item/chat-item";

interface IChatListProps {
	items: IChatItem[];
}

export default class ChatList extends Block {
	constructor(props: IChatListProps) {
		super("ul", {
			...props,
			activeChatId: null,
			classList: "chat-list",
			el: props.items,
			chatItems: props.items.map(
				(chatItem: IChatItem) =>
					new ChatItem({
						...chatItem,
						onClick: (id) => {
							this.setProps({ activeChatId: id });
						},
					})
			),
		});
	}

	public componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): boolean {
		if (
			newProps.activeChatId &&
			oldProps.activeChatId !== newProps.activeChatId
		) {
			const { activeChatId } = newProps;
			const { chatItems } = this.children;

			chatItems.forEach((item) => {
				item.props.id === activeChatId
					? item.setProps({ active: true })
					: item.setProps({ active: false });
			});
			return true;
		}
		return true;
	}

	public render(): string {
		return `
      {{#each chatItems}}
				{{{ this }}}
			{{/each}}
    `;
	}
}
