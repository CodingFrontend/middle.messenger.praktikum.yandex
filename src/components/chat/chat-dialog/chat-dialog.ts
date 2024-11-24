import Block from '@/src/core/block';
import {
  Avatar,
  ChatWidget,
  ChatMessageGroup,
  IconButton,
} from '@/src/components';
import type { IChatWidgetItem } from '@/src/components/chat/chat-widget';
import type { IChatMessageGroup } from '@/src/components/chat/chat-message-group';
import { chatWidgetItems } from '@/src/mockData/chatDataMock';

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
      Avatar: new Avatar({
        image: props.image,
        size: 'small',
      }),
      ChatWidget: new ChatWidget({ items: chatWidgetItems }),
      ChatMessageGroup: new ChatMessageGroup({ groups: props.groups }),
      IconButton: new IconButton({
        faIcon: 'fa-solid fa-ellipsis-vertical',
        type: 'secondary',
        onClick: () =>
          this.setProps({
            showChatWidget: !this.props.showChatWidget,
          }),
      }),
    });
  }
  public render(): string {
    const { groups, activeChatId } = this.props;

    console.log(activeChatId, this.props);
    // const { ChatMessageGroup } = this.children;

    // if (groups) ChatMessageGroup.setProps({ groups });

    return `
      <div class='chat-dialog-top'>
				<div class='chat-dialog-top__user'>
					{{{ Avatar }}}
					<div class='chat-dialog-top__user-name'>{{name}}</div>
				</div>
				<div class="chat-dialog-top__actions">
					<div class='chat-dialog-top__actions-button'>
						{{{ IconButton }}}
					</div>
					{{#if showChatWidget}}
						<div class="chat-dialog-top__actions-widget">
							{{{ ChatWidget }}}
						</div>
					{{/if}}
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
