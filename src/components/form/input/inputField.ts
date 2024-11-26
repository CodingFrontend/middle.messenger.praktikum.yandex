import Block from '@/core/block';

interface InputFieldProps {
  name: string;
  type: string;
  error?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super('input', {
      ...props,
      attrs: {
        autocomplete: 'off',
        placeholder: '',
      },
      events: {
        change: props.onChange,
        blur: props.onBlur,
      },
      classList: `${props.error ? 'input__field-error' : ''}`,
    });
  }
}
