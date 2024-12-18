import Block from "@/core/block";
import { ChatItem } from "@/components";
import type { IChatItem } from "@/components/chat/chat-item/chat-item";

interface IChatListProps {
	items: IChatItem[];
	onClick?: (id: number) => void;
}

class ChatList extends Block {
	constructor(props: IChatListProps) {
		super("ul", {
			...props,
			activeChatId: null,
			unreadMessages: null,
			classList: "chat-list",
			el: props.items,
			rawChatItems: [...props.items],
			chatItems: props.items.map(
				(chatItem: IChatItem) =>
					new ChatItem({
						...chatItem,
						onClick: async (id: number) => {
							this.setProps({ activeChatId: id });
							window.store.set({ activeChatId: id });

							props?.onClick(id);
						},
					})
			),
		});
	}

	public render() {
		const { activeChatId } = this.props;
		const { chatItems } = this.children;

		chatItems.forEach((item) => {
			return item.props.id === activeChatId
				? item.setProps({ active: true })
				: item.setProps({ active: false });
		});

		return `
      {{#each chatItems}}
				{{{ this }}}
			{{/each}}
    `;
	}
}

export default ChatList;
