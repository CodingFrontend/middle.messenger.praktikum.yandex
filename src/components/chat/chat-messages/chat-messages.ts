import Block from '@/core/block';
import { ChatMessagesItem } from '@/components';
import type { IChatMessagesItem } from '@/components/chat/chat-messages-item/chat-messages-item';

export interface IChatMessages {
  messages: IChatMessagesItem[];
}

export default class ChatMessages extends Block {
  constructor(props: IChatMessages) {
    super('ul', {
      ...props,
      classList: 'chat-messages__items',
      messages: props.messages.map(
        (message) => new ChatMessagesItem({ ...message })
      ),
    });
  }
  public render(): string {
    return `
      {{#each messages}}
				{{{ this }}}
			{{/each}}
    `;
  }
}
