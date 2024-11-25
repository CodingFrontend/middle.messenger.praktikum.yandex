import Block from '@/src/core/block';
import { IconTextButton, ChatModal } from '@/src/components';

export interface IChatWidgetItem {
  faIcon: string;
  text: string;
  action: string;
}

interface IChatWidgetProps {
  items: IChatWidgetItem[];
}

export default class ChatWidget extends Block {
  constructor(props: IChatWidgetProps) {
    super('ul', {
      ...props,
      classList: 'chat-widget',
      showModalAdd: false,
      action: '',
      widgetItems: props.items.map(
        (item: IChatWidgetItem) =>
          new IconTextButton({
            label: item.text,
            iconLeft: item.faIcon,
            onClick: () => {
              if (item.action === 'add') {
                this.setProps({
                  showModalAdd: true,
                });
              } else if (item.action === 'delete') {
                this.setProps({
                  showModalDelete: true,
                });
              }
            },
          })
      ),
      ChatModalAdd: new ChatModal({
        modalTitle: 'Добавить пользователя',
        modalButtonLabelOk: 'Добавить',
        onCloseModal: () => {
          this.setProps({ showModalAdd: false });
          this.props.onCloseModal();
        },
      }),
      ChatModalDelete: new ChatModal({
        modalTitle: 'Удалить пользователя',
        modalButtonLabelOk: 'Удалить',
        onCloseModal: () => {
          this.setProps({ showModalDelete: false });
          this.props.onCloseModal();
        },
      }),
    });
  }
  public render(): string {
    return `
      {{#each widgetItems}}
				<li>
					{{{ this }}}
				</li>
			{{/each}}
			{{#if showModalAdd}}
				{{{ ChatModalAdd }}}
			{{/if}}
			{{#if showModalDelete}}
				{{{ ChatModalDelete }}}
			{{/if}}
    `;
  }
}
