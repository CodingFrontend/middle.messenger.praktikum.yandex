import Block from "@/core/block";
import { ChatItem } from "@/components";
import type { ChatItemProps } from "@/components/chat/chat-item/chat-item";

interface IChatListProps {
	items: ChatItemProps[];
	activeChatId?: number;
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
				(chatItem: ChatItemProps) =>
					new ChatItem({
						...chatItem,
						onClick: (id: number) => {
							this.setProps({ activeChatId: id });
							window.store.set({ activeChatId: id });

							if (props?.onClick) props?.onClick(id);
						},
					})
			),
		});
	}

	public render() {
		const { activeChatId } = this.props as IChatListProps;
		const { chatItems } = this.children as any;

		chatItems.forEach((item: any) => {
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
