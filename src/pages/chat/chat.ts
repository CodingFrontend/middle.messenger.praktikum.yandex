import Block from '@/src/core/block';
import {
  LinkButton,
  ChatList,
  ChatDialog,
  SearchChatsInput,
} from '@/src/components';
import { chatItems, chatDialogs } from '../../mockData/chatDataMock';

export default class Chat extends Block {
  constructor() {
    super('main', {
      activeChatId: '',
      classList: 'page chat-page',
      searchValue: '',
      LinkButton: new LinkButton({
        label: 'Профиль',
        type: 'secondary',
      }),
      SearchChatsInput: new SearchChatsInput({
        onKeydown: (e: KeyboardEvent) => {
          const value = (e.target as HTMLInputElement).value;
          if (e.code === 'Enter') {
            this.setProps({
              searchValue: value,
            });

            this.children.ChatList.componentDidUpdate(
              chatItems,
              chatItems.filter((item) => item.name.includes(value))
            );
          }
        },
      }),
      ChatList: new ChatList({
        items: chatItems,
        searchValue: '',
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
    const { searchValue } = this.props;

    const { ChatList } = this.children;

    ChatList.setProps({
      items: chatItems.filter((item) => item.name.includes(searchValue)),
    });

    return `
      <div class='chat-left'>
				<div class='chat-left__top'>
					<div class="chat-left__profile-link">
						{{{ LinkButton }}}
						<span class="arrow"></span>
					</div>
				</div>
				<div class='chat-left__search'>
					{{{ SearchChatsInput }}}
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
    `;
  }
}
