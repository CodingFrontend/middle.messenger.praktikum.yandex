import Block from '@/src/core/block';
import { Modal, Input } from '@/src/components';

interface IModalProps {
  modalTitle: string;
  modalButtonLabelOk: string;
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
        modalTitle: props.modalTitle,
        labelOk: props.modalButtonLabelOk,
        Body: new DialogBody(),
      }),
    });
  }

  public render(): string {
    return `{{{ Modal }}}`;
  }
}
