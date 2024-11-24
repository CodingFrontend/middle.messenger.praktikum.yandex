import Block from '@/src/core/block';
import CustomInputField from './custom-input-field';

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  disabled: boolean;
  error: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super('div', {
      ...props,
      classList: 'custom-input',
      CustomInputField: new CustomInputField({
        name: props.name,
        value: props.value,
        type: props.type || 'text',
        error: props.error,
        onChange: props.onChange,
        onBlur: props.onBlur,
      }),
    });
  }

  public render(): string {
    return `
      <label for='{{name}}' class='custom-input__label'>{{label}}</label>
			<div class="custom-input__field">
				{{{ CustomInputField }}}
				{{#if error}}
					<span class='custom-input__error'>{{error}}</span>
				{{/if}}
			</div>
    `;
  }
}
