import Block from '@/src/core/block';
import { Modal, Input } from '@/src/components';

interface IModalProps {
  modalTitle: string;
  modalButtonLabelOk: string;
  onCloseModal: () => void;
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
      }),
    });
  }

  public render(): string {
    return `{{{ Modal }}}`;
  }
}
