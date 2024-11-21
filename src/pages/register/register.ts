import Block from '@/src/core/block';
import { AuthLayout } from '@/src/layouts/auth';
import { Input } from '@/src/components/form/Input';

class RegisterContent extends Block {
  constructor() {
    super('div', {
      classList: 'auth-form-body',
      InputEmail: new Input({
        label: 'Почта',
        name: 'email',
        type: 'email',
      }),
      InputLogin: new Input({
        label: 'Логин',
        name: 'login',
        type: 'text',
      }),
      InputName: new Input({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
      }),
      InputLastName: new Input({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
      }),
      InputPhone: new Input({
        label: 'Телефон',
        name: 'phone',
        type: 'phone',
      }),
      InputPassword: new Input({
        label: 'Пароль',
        name: 'password',
        type: 'password',
      }),
      InputPasswordRepeat: new Input({
        label: 'Пароль (еще раз)',
        name: 'password_repeat',
        type: 'password_repeat',
      }),
    });
  }

  render(): string {
    return `
			{{{ InputEmail }}}
			{{{ InputLogin }}}
			{{{ InputName }}}
			{{{ InputLastName }}}
			{{{ InputPhone }}}
			{{{ InputPassword }}}
			{{{ InputPasswordRepeat }}}
		`;
  }
}

export default class RegisterPage extends Block {
  constructor() {
    super('main', {
      classList: 'page auth-page',
      AuthLayout: new AuthLayout({
        title: 'Регистрация',
        labelOk: 'Зарегистрироваться',
        labelCancel: 'Войти',
        Content: new RegisterContent(),
      }),
    });
  }

  public render(): string {
    return `
      {{{ AuthLayout }}}
    `;
  }
}
