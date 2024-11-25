import Block from '@/src/core/block';
import { ChatItem } from '@/src/components';
import type { IChatItem } from '@/src/components/chat/chat-item.ts';

interface IChatListProps {
  text: string;
  faIcon: string;
  items: IChatItem[];
  onClick?: (e: Event) => void;
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
              props.onChatSelect(chatItem.id);
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
