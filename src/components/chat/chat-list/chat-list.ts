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
      items: props.items.map(
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
  public render(): string {
    const { activeChatId } = this.props;
    const { items } = this.children;

    items.forEach((item: IChatItem) => {
      item.setProps({ active: false });

      if (item.props.id === activeChatId) {
        item.setProps({ active: true });
        return;
      }
    });

    return `
      {{#each items}}
				{{{ this }}}
			{{/each}}
    `;
  }
}
