import Block from '@/src/core/block';
import { LinkButton, ChatList, ChatDialog } from '@/src/components';
import { chatItems, chatDialogs } from '../../mockData/chatDataMock';

export default class Chat extends Block {
  constructor() {
    super('main', {
      activeChatId: '',
      classList: 'page chat-page',
      showChatWidget: false,
      LinkButton: new LinkButton({
        label: 'Профиль',
        type: 'secondary',
      }),
      ChatList: new ChatList({
        items: chatItems,
        onChatSelect: (id) => {
          const activeChatDialog = id
            ? chatDialogs.find((dialog) => dialog.id === id)
            : {};
          setTimeout(() => {
            this.setProps({
              activeChatId: id,
            });
            this.setChild({
              ChatDialog: new ChatDialog({
                ...activeChatDialog,
              }),
            });
            this.forceUpdate();
          }, 0);
        },
      }),
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
				{{#if activeChatId}}
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
