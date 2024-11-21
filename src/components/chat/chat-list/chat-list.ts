import Block from '@/src/core/block';
import { ChatItem } from '@/src/components';
import type { IChatItem } from '@/src/components/chat/chat-item.ts';

interface IChatListProps {
  text: string;
  faIcon: string;
  items: IChatItem[];
}

export default class ChatList extends Block {
  constructor(props: IChatListProps) {
    super('ul', {
      ...props,
      classList: 'chat-list',
      items: props.items.map(
        (chatItem: IChatItem) =>
          new ChatItem({
            ...chatItem,
          })
      ),
    });
  }
  public render(): string {
    return `
      {{#each items}}
				<li>
					{{{ this }}}
				</li>
			{{/each}}
    `;
  }
}
