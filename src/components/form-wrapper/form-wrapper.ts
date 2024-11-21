import Block from '@/src/core/block';

type FormWrapperProps = {
  title: string;
};

export default class FormWrapper extends Block {
  constructor(props: FormWrapperProps) {
    super('form', {
      ...props,
      classList: 'form',
    });
  }

  public render(): string {
    return `
			<div class='form-title'>{{ title }}</div>
			{{{ Content }}}
		`;
  }
}
