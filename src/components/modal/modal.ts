import Block from '@/core/block';
import { IconButton, Button } from '@/components';

interface IModalProps {
  titleError?: boolean;
  title?: string;
  labelOk?: string;
  labelCancel?: string;
  error?: string;
  Body?: Block;
  onCloseModal: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default class Modal extends Block {
  constructor(props: IModalProps) {
    super('div', {
      ...props,
      classList: 'modal',
      IconButton: new IconButton({
        faIcon: 'fa-solid fa-x',
        type: 'secondary',
        onClick: () => props.onCloseModal(),
      }),
      ButtonOk: new Button({
        label: props.labelOk || '',
        type: 'primary',
        attrs: {
          type: 'button',
        },
        onClick: () => props.onConfirm?.(),
      }),
      ButtonCancel: new Button({
        label: props.labelCancel || '',
        type: 'link',
        onClick: () => props.onCancel?.(),
      }),
    });
  }

  public render(): string {
    console.log(this.props);
    return `
      <div class="modal-dialog">
				<div class="modal-dialog__close-button">
					{{{ IconButton }}}
				</div>
				<h2 {{#if titleError}}class="modal-dialog__title modal-dialog__title--error"{{/if}} class="modal-dialog__title">{{title}}</h2>
				<form class="modal-dialog__form">
					<div class="modal-dialog__body">
						{{{ Body }}}
					</div>
					<div class="modal-dialog__footer">
						{{{ ButtonOk }}}
						{{#if labelCancel}}
							{{{ ButtonCancel }}}
						{{/if}}
						{{#if error}}
							<p class="modal-dialog__error">{{error}}</p>
						{{/if}}
					</div>
				</form>
			</div>
    `;
  }
}
