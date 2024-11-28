import Block from '@/core/block';
import {
  LinkButton,
  ChatList,
  ChatDialog,
  SearchChatsInput,
} from '@/components';
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

            const oldProps = { items: chatItems };
            const newProps = {
              items: chatItems.filter((item) => item.name.includes(value)),
            };

            this.children.ChatList.componentDidUpdate(oldProps, newProps);
          }
        },
      }),
      ChatList: new ChatList({
        items: chatItems,
        onChatSelect: (id: string) => {
          const activeChatDialog = id
            ? chatDialogs.find((dialog) => dialog.id === id)
            : null;
          if (!activeChatDialog) return;
          setTimeout(() => {
            this.setProps({
              activeChatId: id,
            });
            this.setChild({
              ChatDialog: new ChatDialog({
                id: activeChatDialog.id,
                name: activeChatDialog.name,
                groups: activeChatDialog.groups,
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
      items: chatItems.filter((item) =>
        item.name.includes(searchValue as string)
      ),
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
