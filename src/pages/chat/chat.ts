import Block from '@/src/core/block';
import { LinkButton, ChatList, ChatModal, ChatDialog } from '@/src/components';
import { chatWidgetItems, chatItems, messagesGroup } from './chatDataMock';

export default class Chat extends Block {
  constructor() {
    super('main', {
      classList: 'page chat-page',
      LinkButton: new LinkButton({
        label: 'Профиль',
        type: 'secondary',
      }),
      ChatList: new ChatList({
        items: chatItems,
      }),
      ChatDialog: new ChatDialog({
        userName: 'Вадим',
        image: '',
        chatWidgetItems: chatWidgetItems,
        messages: messagesGroup,
      }),
      ChatModal: new ChatModal({
        modalTitle: 'Добавить пользователя',
        modalButtonLabelOk: 'Добавить',
      }),
      isChatSelected: true,
    });
  }

  public render(): string {
    return `
      <div class='chat-left'>
				<div class='chat-left__top'>
					<div class="chat-left__profile-link">
						{{{ LinkButton }}}
						<span class="arrow"></span>
					</div>
				</div>
				<div class='chat-left__search'>
					<input type='search' name='search' autocomplete='off' placeholder='Поиск'/>
				</div>
				<div class='chat-left__content'>
					{{{ ChatList }}}
				</div>
			</div>
			<div class='chat-content'>
				{{#if isChatSelected}}
					{{{ ChatDialog }}}
				{{else}}
					<div class="chat-content-empty">
						<p>Выберите чат чтобы отправить сообщение</p>
					</div>
				{{/if}}
			</div>
			{{#if showModal}}
				{{{ ChatModal }}}
			{{/if}}
    `;
  }
}
