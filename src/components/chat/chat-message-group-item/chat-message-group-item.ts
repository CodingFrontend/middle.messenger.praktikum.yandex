import Block from '@/src/core/block';
import { ChatMessages } from '@/src/components';
export interface IChatMessageGroup {
  id: string;
  date: string;
  groups: any;
}

export default class ChatMessageGroup extends Block {
  constructor(props: IChatMessageGroup) {
    super('div', {
      ...props,
      classList: 'chat-message-group',
      messages: new ChatMessages({ messages: props.messages }),
    });
  }
  public render(): string {
    console.log(2, this.props);

    return `
			<div class="chat-messages__date">
				<span>{{date}}</span>
			</div>
			{{{ messages }}}
    `;
  }
}
