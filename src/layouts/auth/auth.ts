import Block from '@/src/core/block';
import { PageTitle } from '@/src/components';

interface IAuthLayoutProps {
  title: string;
}

export default class AuthLayout extends Block {
  constructor(props: IAuthLayoutProps) {
    super('div', {
      ...props,
      classList: 'auth-page-card',
      PageTitle: new PageTitle({
        title: props.title,
      }),
    });
  }

  public render(): string {
    return `
			<form class="auth-form">
				{{{ PageTitle }}}
				{{{ Content }}}
			</form>
    `;
  }
}
