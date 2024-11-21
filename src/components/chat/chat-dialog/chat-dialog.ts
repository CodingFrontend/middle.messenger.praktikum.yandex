import Block from '@/src/core/block';
import {
  Avatar,
  ChatWidget,
  ChatMessageGroup,
  IconButton,
} from '@/src/components';
import type { IChatWidgetItem } from '@/src/components/chat/chat-widget';
import type { IChatMessageGroup } from '@/src/components/chat/chat-message-group';

export interface IChatDialog {
  userName: string;
  image: string;
  chatWidgetItems: IChatWidgetItem[];
  messages: IChatMessageGroup[];
}

export default class ChatDialog extends Block {
  constructor(props: IChatDialog) {
    super('div', {
      ...props,
      classList: 'chat-dialog',
      Avatar: new Avatar({
        image: props.image,
        size: 'small',
      }),
      ChatWidget: new ChatWidget({ items: props.chatWidgetItems }),
      ChatMessageGroup: new ChatMessageGroup({ messages: props.messages }),
      IconButton: new IconButton({
        faIcon: 'fa-solid fa-arrow-right',
        type: 'primary',
      }),
    });
  }
  public render(): string {
    return `
      <div class='chat-dialog-top'>
				<div class='chat-dialog-top__user'>
					{{{ Avatar }}}
					<div class='chat-dialog-top__user-name'>{{userName}}</div>
				</div>
				<div class="chat-dialog-top__actions">
					<div class='chat-dialog-top__actions-button'>
						<i class='fa-solid fa-ellipsis-vertical'></i>
					</div>
					<div class="chat-dialog-top__actions-widget">
						{{{ ChatWidget }}}
					</div>
				</div>
			</div>
			<div class="chat-dialog-content">
				{{{ ChatMessageGroup }}}
			</div>
			<div class="chat-dialog-bottom">
				<div class="chat-dialog-bottom__field">
					<input type="text" placeholder="Сообщение">
				</div>
				<div class="chat-dialog-bottom__send-button">
					{{{ IconButton }}}
				</div>
			</div>
    `;
  }
}
