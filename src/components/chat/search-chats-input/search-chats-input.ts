import Block from '@/core/block';

interface InputFieldProps {
  name?: string;
  onKeydown: (e: KeyboardEvent) => void;
}

export default class SearchChatsInput extends Block {
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
