import Block from '@/src/core/block';
import { AuthLayout } from '@/src/layouts/auth';
import { Input } from '@/src/components/form/Input';

class AuthContent extends Block {
  constructor() {
    super('div', {
      classList: 'auth-page__body',
      InputLogin: new Input({
        label: 'Логин',
        name: 'login',
        type: 'text',
      }),
      InputPassword: new Input({
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }),
    });
  }

  render(): string {
    return `
			{{{ InputLogin }}}
			{{{ InputPassword }}}
		`;
  }
}

export default class LoginPage extends Block {
  constructor() {
    super('div', {
      AuthLayout: new AuthLayout({
        title: 'Логин',
        labelOk: 'Авторизоваться',
        labelCancel: 'Нет аккаунта?',
        Content: new AuthContent(),
      }),
    });
  }

  public render(): string {
    return `
      {{{ AuthLayout }}}
    `;
  }
}
