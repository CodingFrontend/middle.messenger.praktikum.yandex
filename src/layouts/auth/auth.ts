import Block from '@/src/core/block';

type AuthLayoutProps = {
  title?: string;
  labelOk?: string;
  labelCancel?: string;
};

export default class AuthLayout extends Block {
  constructor(props: AuthLayoutProps) {
    super('main', {
      ...props,
      classList: 'page auth-page',
    });
  }

  public render(): string {
    return `
      <div class="auth-page__card">
				{{#> FormWrapper}}
					{{#*inline "title"}}
						{{> PageTitle title=title}}
					{{/inline}}
					{{{ Content }}}
					<div class="auth-page__buttons">
						{{> Button label=labelOk type="primary" }}
						{{> LinkButton label=labelCancel type="primary" }}
					</div>
				{{/ FormWrapper}}
			</div>
    `;
  }
}
