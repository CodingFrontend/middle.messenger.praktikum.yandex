import Block from '@/src/core/block';
import {
  Avatar,
  ChatWidget,
  ChatMessageGroup,
  IconButton,
  SendMessageInput,
} from '@/src/components';
import { chatWidgetItems } from '@/src/mockData/chatDataMock';
import { validateField } from '@/src/utils/validate';

export interface IChatDialog {
  // chatDialog: any;
  activeChatId: string;
  showModalAddUser: false;
  showModalDeleteUser: false;
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
      ChatWidget: new ChatWidget({
        items: chatWidgetItems,
        onCloseModal: () => this.setProps({ showChatWidget: false }),
      }),
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
          setTimeout(() => {
            const value = this.props.messageText;
            let error = validateField('message', value);

            if (error) return;

            console.log(value);
          }, 0);
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
