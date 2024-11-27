import Block from '@/core/block';
import { ChatMessagesItem } from '@/components';
import type { IChatMessagesItem } from '@/components/chat/chat-messages-item/chat-messages-item';

export interface IChatMessageGroupItem {
  date?: string;
  messages?: IChatMessagesItem[];
}

export default class ChatMessageGroupItem extends Block {
  constructor(props: IChatMessageGroupItem) {
    super('div', {
      ...props,
      classList: 'chat-message-group',
      messages: props.messages?.map(
        (message) => new ChatMessagesItem({ ...message })
      ),
    });
  }
  public render(): string {
    return `
			<div class="chat-messages__date">
				<span>{{date}}</span>
			</div>
			<ul class="chat-messages__items">
				{{#each messages}}
					{{{ this }}}
				{{/each}}
			</ul>
    `;
  }
}
