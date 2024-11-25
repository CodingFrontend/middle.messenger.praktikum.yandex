import Block from '@/src/core/block';

interface InputFieldProps {
  name: string;
  onKeydown: (e: Event) => void;
}

export default class CustomInputField extends Block {
  constructor(props: InputFieldProps) {
    super('input', {
      ...props,
      classList: 'search-chats-input',
      attrs: {
        type: 'search',
        autocomplete: 'off',
        placeholder: 'Поиск',
      },
      events: {
        keydown: props.onKeydown,
      },
    });
  }
}
