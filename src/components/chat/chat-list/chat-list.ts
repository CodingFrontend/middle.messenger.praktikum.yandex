import Block from '@/core/block';
import { ChatItem } from '@/components';
import type { IChatItem } from '@/components/chat/chat-item/chat-item';

interface IChatListProps {
  items: IChatItem[];
  onClick?: (e: Event) => void;
  onChatSelect?: (id: string) => void;
}

export default class ChatList extends Block {
  constructor(props: IChatListProps) {
    super('ul', {
      ...props,
      activeChatId: null,
      classList: 'chat-list',
      el: props.items,
      chatItems: props.items.map(
        (chatItem: IChatItem) =>
          new ChatItem({
            ...chatItem,
            onClick: () => {
              this.setProps({ activeChatId: chatItem.id });
              if (props.onChatSelect) props.onChatSelect(chatItem.id);
            },
          })
      ),
    });
  }

  public componentDidUpdate() {
    const { items } = this.props;

    this.children.chatItems = items.map(
      (chatItem: IChatItem) =>
        new ChatItem({
          ...chatItem,
          onClick: () => {
            this.setProps({ activeChatId: chatItem.id });
            this.props.onChatSelect(chatItem.id);
          },
        })
    );

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
