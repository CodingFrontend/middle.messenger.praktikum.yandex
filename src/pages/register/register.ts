import Block from '@/core/block';
import { AuthLayout } from '@/layouts/auth';
import { Input, Button, LinkButton } from '@/components';
import { validateField } from '@/utils/validate';

interface IForm {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password_repeat: string;
}

interface IErrors {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password_repeat: string;
}

class RegisterContent extends Block {
  constructor() {
    super('div', {
      form: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_repeat: '',
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_repeat: '',
      },
      classList: 'auth-form-body',
      InputEmail: new Input({
        label: 'Почта',
        name: 'email',
        type: 'email',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = validateField('email', value);

          this.children.InputEmail.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...(this.props.errors as IErrors),
              email: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              email: value,
            },
          });
        },
      }),
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
              ...(this.props.errors as IErrors),
              login: error,
            },
          });

          if (error) return;

          this.setProps({
            loginForm: {
              ...(this.props.form as IForm),
              login: value,
            },
          });
        },
      }),
      InputName: new Input({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = validateField('first_name', value);

          this.children.InputName.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...(this.props.errors as IErrors),
              first_name: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              first_name: value,
            },
          });
        },
      }),
      InputLastName: new Input({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = validateField('second_name', value);

          this.children.InputLastName.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...(this.props.errors as IErrors),
              second_name: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              second_name: value,
            },
          });
        },
      }),
      InputPhone: new Input({
        label: 'Телефон',
        name: 'phone',
        type: 'phone',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = validateField('phone', value);

          this.children.InputPhone.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...(this.props.errors as IErrors),
              phone: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              phone: value,
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
              ...(this.props.errors as IErrors),
              password: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              password: value,
            },
          });
        },
      }),
      InputPasswordRepeat: new Input({
        label: 'Пароль (еще раз)',
        name: 'password_repeat',
        type: 'password_repeat',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = '';

          if ((this.props.form as IForm).password !== value)
            error = 'Пароли не совпадают';

          this.children.InputPasswordRepeat.setProps({
            error,
          });

          this.setProps({
            errors: {
              ...(this.props.errors as IErrors),
              password_repeat: error,
            },
          });

          if (error) return;

          this.setProps({
            form: {
              ...(this.props.form as IForm),
              password_repeat: value,
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
            for (let key in this.props.errors as IErrors) {
              if (this.props.errors[key]) return;
            }

            console.log(this.props.form as IForm);
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
			{{{ InputEmail }}}
			{{{ InputLogin }}}
			{{{ InputName }}}
			{{{ InputLastName }}}
			{{{ InputPhone }}}
			{{{ InputPassword }}}
			{{{ InputPasswordRepeat }}}
			 <div class="auth-form__buttons">
				{{{ ButtonOk }}}
				{{{ ButtonCancel }}}
			</div>
		`;
  }
}

export default class RegisterPage extends Block {
  constructor() {
    super('main', {
      classList: 'page auth-page',
      AuthLayout: new AuthLayout({
        title: 'Регистрация',
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
