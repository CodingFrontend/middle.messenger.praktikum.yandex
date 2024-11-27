import Block from '@/core/block';
import { IconTextButton, ChatModal } from '@/components';
import type { IErrors } from '@/components/chat/chat-modal/chat-modal';

export interface IChatWidgetItem {
  faIcon?: string;
  text: string;
  action: string;
}

interface IChatWidgetProps {
  items: IChatWidgetItem[];
  onCloseModal: () => void;
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
              } else if (item.action === 'remove') {
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
          props.onCloseModal();
        },
        onConfirm: () => {
          setTimeout(() => {
            // ToDo отрефакторить
            const form =
              this.children.ChatModalAdd.children.Modal.children.Body.props
                .form;
            const errors =
              this.children.ChatModalAdd.children.Modal.children.Body.props
                .errors;

            for (const key in errors) {
              if (errors[key]) return;
            }
            console.log(form);
            props.onCloseModal();
          }, 0);
        },
      }),
      ChatModalDelete: new ChatModal({
        modalTitle: 'Удалить пользователя',
        modalButtonLabelOk: 'Удалить',
        onCloseModal: () => {
          this.setProps({ showModalDelete: false });
          props.onCloseModal();
        },
        onConfirm: () => {
          setTimeout(() => {
            // ToDo отрефакторить
            const form =
              this.children.ChatModalDelete.children.Modal.children.Body.props
                .form;
            const errors =
              this.children.ChatModalDelete.children.Modal.children.Body.props
                .errors;

            for (const key in errors as IErrors) {
              if (errors[key]) return;
            }
            console.log(form);
            props.onCloseModal();
          }, 0);
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
