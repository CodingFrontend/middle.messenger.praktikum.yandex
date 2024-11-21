import Block from '@/src/core/block';
import { ChatMessagesItem } from '@/src/components';
import type { IChatMessagesItem } from '@/src/components/chat/chat-messages-item';

interface IChatMessages {
  messages: IChatMessagesItem[];
}

export default class ChatMessages extends Block {
  constructor(props: IChatMessages) {
    super('ul', {
      ...props,
      classList: 'chat-messages__items',
      messages: props.messages.map(
        (props: IChatMessagesItem) => new ChatMessagesItem({ ...props })
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
