import Block from '@/core/block';
import { Modal, LinkButton } from '@/components';

interface ChangeAvatarModalProps {
  fileName?: string;
  uploadError?: string;
  emptyError?: string;
  onCloseModal: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface IModalBodyUploadProps {
  onSelectFile: () => void;
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
  constructor(props: IModalBodyUploadProps) {
    super('div', {
      classList: 'avatar-modal-body',
      LinkButton: new LinkButton({
        label: 'Выберите файл на компьютере',
        type: 'primary',
        onClick: () => props.onSelectFile(),
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
      Modal: new Modal({
        title: 'Файл загружен',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBody(),
        onCloseModal: () => props.onCloseModal(),
        onConfirm: () => props.onConfirm?.(),
        onCancel: () => props.onCancel?.(),
      }),
      ModalError: new Modal({
        title: 'Ошибка, попробуйте еще раз',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBodyUpload({
          onSelectFile: () => {},
        }),
        onCloseModal: () => props.onCloseModal(),
        onConfirm: () => props.onConfirm?.(),
        onCancel: () => props.onCancel?.(),
      }),
      ModalUpload: new Modal({
        title: 'Загрузите файл',
        labelOk: 'Поменять',
        error: props.emptyError,
        Body: new ModalBodyUpload({
          onSelectFile: () => {},
        }),
        onCloseModal: () => props.onCloseModal(),
        onCancel: () => props.onCancel?.(),
        onConfirm: () => props.onConfirm?.(),
      }),
    });
  }

  public render(): string {
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
