import Block from "@/core/block";
import { AuthLayout } from "@/layouts/auth";
import { Input, Button, LinkButton } from "@/components";
import { validateField } from "@/utils/validate";
import { withRouter } from "@/utils/withRouter";
import { checkPasswordRepeat } from "@/utils/rules";
import * as authServices from "@/services/auth";
import { connect } from "@/utils/connect";

import { ROUTES } from "@/constants";

interface IFormData {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	phone: string;
	password: string;
}

interface IForm extends IFormData {
	password_repeat: string;
}

interface IRegisterPageProps {
	isLoading: boolean;
	registerError: boolean;
}

interface IRegisterProps extends IRegisterPageProps {
	form: IForm;
}

class RegisterContent extends Block {
	constructor(props: IRegisterProps) {
		super("div", {
			...props,
			form: {
				email: "",
				login: "",
				first_name: "",
				second_name: "",
				phone: "",
				password: "",
				password_repeat: "",
			},
			classList: "auth-form-body",
			InputEmail: new Input({
				label: "Почта",
				name: "email",
				type: "email",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("email", value);

					this.children.InputEmail.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							email: value,
						},
					});
				},
			}),
			InputLogin: new Input({
				label: "Логин",
				name: "login",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("login", value);

					this.children.InputLogin.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						loginForm: {
							...((this.props as IRegisterProps).form as IForm),
							login: value,
						},
					});
				},
			}),
			InputName: new Input({
				label: "Имя",
				name: "first_name",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("first_name", value);

					this.children.InputName.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							first_name: value,
						},
					});
				},
			}),
			InputLastName: new Input({
				label: "Фамилия",
				name: "second_name",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("second_name", value);

					this.children.InputLastName.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							second_name: value,
						},
					});
				},
			}),
			InputPhone: new Input({
				label: "Телефон",
				name: "phone",
				type: "phone",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("phone", value);

					this.children.InputPhone.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							phone: value,
						},
					});
				},
			}),
			InputPassword: new Input({
				label: "Пароль",
				name: "password",
				type: "password",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("password", value);

					this.children.InputPassword.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							password: value,
						},
					});
				},
			}),
			InputPasswordRepeat: new Input({
				label: "Пароль (еще раз)",
				name: "password_repeat",
				type: "password",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const password = this.children.InputPassword.value();

					const error = checkPasswordRepeat(password, value);

					this.children.InputPasswordRepeat.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						form: {
							...((this.props as IRegisterProps).form as IForm),
							password_repeat: value,
						},
					});
				},
			}),
			ButtonOk: new Button({
				label: "Зарегистрироваться",
				type: "primary",
				isLoading: props.isLoading,
				attrs: {
					type: "button",
				},
				onClick: () => {
					const login = this.children.InputLogin.value();
					const password = this.children.InputPassword.value();
					const password_repeat = this.children.InputPasswordRepeat.value();
					const email = this.children.InputEmail.value();
					const first_name = this.children.InputName.value();
					const second_name = this.children.InputLastName.value();
					const phone = this.children.InputPhone.value();

					const errorLogin = validateField("login", login);
					const errorPassword = validateField("password", password);
					const errorPasswordRepeat = checkPasswordRepeat(
						password,
						password_repeat
					);
					const errorEmail = validateField("email", email);
					const errorFirstName = validateField("first_name", first_name);
					const errorSecondName = validateField("second_name", second_name);
					const errorPhone = validateField("phone", phone);

					if (errorLogin) {
						this.children.InputPassword.setProps({
							error: errorLogin,
						});
					}

					if (errorPassword) {
						this.children.InputPassword.setProps({
							error: errorPassword,
						});
					}

					if (errorPasswordRepeat) {
						this.children.InputPasswordRepeat.setProps({
							error: errorPasswordRepeat,
						});
					}

					if (errorEmail) {
						this.children.InputEmail.setProps({
							error: errorEmail,
						});
					}

					if (errorFirstName) {
						this.children.InputName.setProps({
							error: errorFirstName,
						});
					}

					if (errorSecondName) {
						this.children.InputLastName.setProps({
							error: errorSecondName,
						});
					}

					if (errorPhone) {
						this.children.InputPhone.setProps({
							error: errorPhone,
						});
					}

					if (
						errorLogin ||
						errorPassword ||
						errorPasswordRepeat ||
						errorEmail ||
						errorFirstName ||
						errorSecondName ||
						errorPhone
					)
						return;

					const data: IFormData = {
						login,
						password,
						email,
						first_name,
						second_name,
						phone,
					};

					authServices.register(data);
				},
			}),
			ButtonCancel: new LinkButton({
				label: "Нет аккаунта?",
				type: "primary",
				onClick: () => window.router.go(ROUTES.login),
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
			{{#if registerError}}
				<p class="error">{{ registerError }}</p>
			{{/if}}
			 <div class="auth-form__buttons">
				{{{ ButtonOk }}}
				{{{ ButtonCancel }}}
			</div>
		`;
	}
}

class RegisterPage extends Block {
	constructor(props: IRegisterPageProps) {
		super("main", {
			...props,
			classList: "page auth-page",
			AuthLayout: new AuthLayout({
				title: "Регистрация",
				Content: new RegisterContentBlock({ ...props }),
			}),
		});
	}

	public render(): string {
		return `
      {{{ AuthLayout }}}
    `;
	}
}

const RegisterContentBlock = connect(({ isLoading, registerError }) => ({
	isLoading,
	registerError,
}))(RegisterContent);

export default withRouter(RegisterPage);
