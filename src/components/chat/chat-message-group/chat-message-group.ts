import Block from '@/src/core/block';
import { ChatMessages } from '@/src/components';
import type { IChatMessages } from '@/src/components/chat/chat-messages';

export interface IChatMessageGroup {
  date: string;
  messages: IChatMessages[];
}

export default class ChatMessageGroup extends Block {
  constructor(props: IChatMessageGroup) {
    super('div', {
      ...props,
      classList: 'chat-message-group',
      messages: props.messages.map(
        (props: IChatMessages) => new ChatMessages({ ...props })
      ),
    });
  }
  public render(): string {
    return `
      {{#each messages}}
				<div class="chat-messages__date">
					<span>{{date}}</span>
				</div>
				{{{ this }}}
			{{/each}}
    `;
  }
}
