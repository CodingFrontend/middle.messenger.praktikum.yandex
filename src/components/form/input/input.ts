import Block from '@/src/core/block';
import InputField from './InputField';

type InputProps = {
  label: string;
  name?: string;
  type?: string;
  error?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    const inputFieldProps = {
      name: props.name,
      type: props.type || 'text',
      error: props.error,
    };
    super('div', {
      ...props,
      classList: 'input',
      InputField: new InputField({
        ...inputFieldProps,
        onChange: props.onChange,
        onBlur: props.onBlur,
      }),
    });
  }

  public render(): string {
    return `
         <input
					type='{{type}}'
					{{#if error}} class="input__field-error"{{/if}}
					name='{{name}}'
					id='{{name}}'
					autocomplete='off'
					placeholder=''
				/>
				<label for='{{name}}' class='input__label'>{{label}}</label>
				{{#if error}}
					<span class='input__error'>{{error}}</span>
				{{/if}}
    `;
  }
}
