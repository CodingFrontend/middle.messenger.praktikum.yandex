import Block from '@/core/block';
import { Modal, Input } from '@/components';

interface IModalProps {
  modalTitle: string;
  modalButtonLabelOk: string;
  onCloseModal: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

class DialogBody extends Block {
  constructor() {
    super('div', {
      Input: new Input({
        label: 'Логин',
        name: 'login',
        type: 'text',
      }),
    });
  }

  render(): string {
    return `{{{ Input }}}`;
  }
}

export default class ChatModal extends Block {
  constructor(props: IModalProps) {
    super('div', {
      ...props,
      classList: 'chat-modal',
      Modal: new Modal({
        title: props.modalTitle,
        labelOk: props.modalButtonLabelOk,
        Body: new DialogBody(),
        onCloseModal: () => props.onCloseModal(),
        onConfirm: () => props.onConfirm(),
        onCancel: () => props.onCancel(),
      }),
    });
  }

  public render(): string {
    return `{{{ Modal }}}`;
  }
}
