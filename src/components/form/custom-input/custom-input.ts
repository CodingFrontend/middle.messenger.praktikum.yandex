import Block from '@/src/core/block';

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  disabled: boolean;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super('div', {
      ...props,
      classList: 'custom-input',
    });
  }

  public render(): string {
    return `
      <label for='{{name}}' class='custom-input__label'>{{label}}</label>
  		<input type='{{type}}' value="{{value}}" name='{{name}}' id='{{name}}' autocomplete='off' {{#if disabled}}disabled="true"{{/if}}/>
    `;
  }
}
