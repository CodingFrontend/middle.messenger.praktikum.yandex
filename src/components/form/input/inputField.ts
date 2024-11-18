import Block from '@/src/core/block';

type InputFieldProps = {
  name?: string;
  type?: string;
  error?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
};

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super('input', {
      ...props,
      classList: `${props.error ? 'input__field-error' : ''}`,
      change: props.onChange,
      blur: props.onBlur,
    });
  }
}
