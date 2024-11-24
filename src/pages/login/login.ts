import Block from '@/src/core/block';
import { AuthLayout } from '@/src/layouts/auth';
import { Input, Button, LinkButton } from '@/src/components';
import { checkLogin } from '@/src/utils/rules';

class AuthContent extends Block {
  constructor() {
    super('div', {
      loginForm: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      classList: 'auth-form-body',
      InputLogin: new Input({
        label: 'Логин',
        name: 'login',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = checkLogin(value);

          this.children.InputLogin.setProps({
            error,
          });

          if (error) return;

          this.setProps({
            loginForm: {
              ...this.props.loginForm,
              login: value,
            },
          });
        },
      }),
      InputPassword: new Input({
        label: 'Пароль',
        name: 'password',
        type: 'password',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = value === 'error' ? 'Some error' : '';

          this.children.InputPassword.setProps({
            error,
          });

          if (error) return;

          this.setProps({
            loginForm: {
              ...this.props.loginForm,
              password: value,
            },
          });
        },
      }),
      ButtonOk: new Button({
        label: 'Авторизоваться',
        type: 'primary',
        attrs: {
          type: 'confirm',
        },
        onClick: (e) => {
          e.preventDefault();
          console.log(this.props.loginForm);
        },
      }),
      ButtonCancel: new LinkButton({
        label: 'Нет аккаунта?',
        type: 'primary',
        onClick: (e) => {
          e.preventDefault();
        },
      }),
    });
  }

  render(): string {
    return `
			{{{ InputLogin }}}
			{{{ InputPassword }}}
			<div class="auth-form__buttons">
				{{{ ButtonOk }}}
				{{{ ButtonCancel }}}
			</div>
		`;
  }
}

export default class LoginPage extends Block {
  constructor() {
    super('main', {
      classList: 'page auth-page',
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
