import Block from '@/core/block';
import { ChatMessages } from '@/components';
import type { IChatMessages } from '@/components/chat/chat-messages/chat-messages';

export interface IChatMessageGroupItem {
  id: string;
  date: string;
  messages: IChatMessages[];
}

export default class ChatMessageGroup extends Block {
  constructor(props: IChatMessageGroupItem) {
    super('div', {
      ...props,
      classList: 'chat-message-group',
      messages: new ChatMessages({ messages: props.messages }),
    });
  }
  public render(): string {
    return `
			<div class="chat-messages__date">
				<span>{{date}}</span>
			</div>
			{{{ messages }}}
    `;
  }
}
