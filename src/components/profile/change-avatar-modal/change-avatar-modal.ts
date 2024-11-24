import Block from '@/src/core/block';
import { Modal, LinkButton } from '@/src/components';

interface ChangeAvatarModalProps {
  fileName: string;
  uploadError: boolean;
  emptyError: string;
}

class ModalBody extends Block {
  constructor() {
    super('div', {
      classList: 'avatar-modal-body',
    });
  }

  public render(): string {
    return `
			<p class="avatar-modal-file">{{fileName}}</p>
		`;
  }
}

class ModalBodyUpload extends Block {
  constructor() {
    super('div', {
      classList: 'avatar-modal-body',
      LinkButton: new LinkButton({
        label: 'Выберите файл на компьютере',
        type: 'primary',
      }),
    });
  }

  public render(): string {
    return `
			<div class="avatar-modal-button">
				{{{ LinkButton }}}
			</div>
		`;
  }
}

export default class ChangeAvatarModal extends Block {
  constructor(props: ChangeAvatarModalProps) {
    super('div', {
      ...props,
      // Todo: Отрефакторить
      Modal: new Modal({
        title: 'Файл загружен',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBody(),
        onCloseModal: () => props.onCloseModal(),
        onConfirm: () => props.onConfirm(),
        onCancel: () => props.onCancel(),
      }),
      ModalError: new Modal({
        title: 'Ошибка, попробуйте еще раз',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBodyUpload(),
        onCloseModal: () => props.onCloseModal(),
        onCancel: () => props.onCancel(),
      }),
      ModalUpload: new Modal({
        title: 'Загрузите файл',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBodyUpload(),
        onCloseModal: () => props.onCloseModal(),
        onCancel: () => props.onCancel(),
      }),
    });
  }

  public render(): string {
    // Todo: Отрефакторить
    return `
		{{#if fileName}}
			{{{ Modal }}}
		{{else if uploadError}}
			{{{ ModalError }}}
		{{else}}
			{{{ ModalUpload }}}
		{{/if}}
		`;
  }
}
