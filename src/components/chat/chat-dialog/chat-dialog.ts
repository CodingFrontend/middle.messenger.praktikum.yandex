import Block from '@/src/core/block';
import {
  Avatar,
  ChatWidget,
  ChatMessageGroup,
  IconButton,
  SendMessageInput,
} from '@/src/components';
import type { IChatWidgetItem } from '@/src/components/chat/chat-widget';
import type { IChatMessageGroup } from '@/src/components/chat/chat-message-group';
import { chatWidgetItems } from '@/src/mockData/chatDataMock';
import { validateField } from '@/src/utils/validate';

export interface IChatDialog {
  // chatDialog: any;
  activeChatId: string;
  // userName: string;
  // image: string;
  // chatWidgetItems: IChatWidgetItem[];
  // messages: IChatMessageGroup[];
}

export default class ChatDialog extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      showChatWidget: false,
      classList: 'chat-dialog',
      messageText: '',
      Avatar: new Avatar({
        image: props.image,
        size: 'small',
      }),
      ChatWidget: new ChatWidget({ items: chatWidgetItems }),
      ChatMessageGroup: new ChatMessageGroup({ groups: props.groups }),
      ChatWidgetButton: new IconButton({
        faIcon: 'fa-solid fa-ellipsis-vertical',
        type: 'secondary',
        onClick: () =>
          this.setProps({
            showChatWidget: !this.props.showChatWidget,
          }),
      }),
      SendMessageInput: new SendMessageInput({
        name: 'message',
        onBlur: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          this.setProps({
            messageText: value,
          });
        },
      }),
      SendMessageButton: new IconButton({
        faIcon: 'fa-solid fa-arrow-right',
        type: 'primary',
        onClick: () => {
          const value = (e.target as HTMLInputElement).value;
          let error = validateField('message', value);

          if (error) return;

          // this.setProps({
          //   form: {
          //     ...this.props.form,
          //     email: value,
          //   },
          // });
        },
      }),
    });
  }
  public render(): string {
    return `
      <div class='chat-dialog-top'>
				<div class='chat-dialog-top__user'>
					{{{ Avatar }}}
					<div class='chat-dialog-top__user-name'>{{name}}</div>
				</div>
				<div class="chat-dialog-top__actions">
					<div class='chat-dialog-top__actions-button'>
						{{{ ChatWidgetButton }}}
					</div>
					{{#if showChatWidget}}
						<div class="chat-dialog-top__actions-widget">
							{{{ ChatWidget }}}
						</div>
					{{/if}}
				</div>
			</div>
			<div class="chat-dialog-content">
				{{#if groups}}
					{{{ ChatMessageGroup }}}
				{{/if}}
			</div>
			<div class="chat-dialog-bottom">
				<div class="chat-dialog-bottom__field">
				{{{ SendMessageInput }}}
				</div>
				<div class="chat-dialog-bottom__send-button">
					{{{ SendMessageButton }}}
				</div>
			</div>
    `;
  }
}
