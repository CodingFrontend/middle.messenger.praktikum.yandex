import Block from '@/src/core/block';
import { AuthLayout } from '@/src/layouts/auth';
import { Input, Button, LinkButton } from '@/src/components';
import { validateField } from '@/src/utils/validate';

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
          let error = validateField('login', value);

          this.children.InputLogin.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...this.props.errors,
              login: error,
            },
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
          let error = validateField('password', value);

          this.children.InputPassword.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...this.props.errors,
              password: error,
            },
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
          type: 'button',
        },
        onClick: () => {
          setTimeout(() => {
            for (let key in this.props.errors) {
              if (this.props.errors[key]) return;
            }

            console.log(this.props.loginForm);
          }, 0);
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
