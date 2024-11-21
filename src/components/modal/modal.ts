import Block from '@/src/core/block';
import { IconButton, Button } from '@/src/components';

interface IModalProps {
  titleError?: boolean;
  title?: string;
  labelOk?: boolean;
  labelCancel?: string;
  error?: string;
}

export default class Modal extends Block {
  constructor(props: IModalProps) {
    super('div', {
      ...props,
      classList: 'modal',
      IconButton: new IconButton({
        faIcon: 'fa-solid fa-x',
        type: 'secondary',
      }),
      ButtonOk: new Button({
        label: props.labelOk,
        type: 'primary',
      }),
      ButtonCancel: new Button({
        label: props.labelCancel,
        type: 'link',
      }),
    });
  }

  public render(): string {
    return `
      <div class="modal-dialog">
				<div class="modal-dialog__close-button">
					{{{ IconButton }}}
				</div>
				<h2 {{#if titleError}}class="modal-dialog__title modal-dialog__title--error"{{/if}} class="modal-dialog__title">{{title}}</h2>
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
			</div>
    `;
  }
}
