import Block from "@/core/block";
import { AuthLayout } from "@/layouts/auth";
import { Input, Button, LinkButton } from "@/components";
import { validateField } from "@/utils/validate";
import { ROUTES } from "@/constants";
import { withRouter } from "@/utils/withRouter";
import * as authServices from "@/services/auth";
import { connect } from "@/utils/connect";

interface ILoginForm {
	login: string;
	password: string;
}

interface IAuthContentProps {
	isLoading: boolean;
	loginError: string;
	loginForm: ILoginForm;
}

interface ILoginPageProps {
	isLoading: boolean;
	loginError: boolean;
}

class AuthContent extends Block {
	constructor(props: IAuthContentProps) {
		super("div", {
			...props,
			loginForm: {
				login: "",
				password: "",
			},
			classList: "auth-form-body",
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
							...((this.props as IAuthContentProps).loginForm as ILoginForm),
							login: value,
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
						loginForm: {
							...((this.props as IAuthContentProps).loginForm as ILoginForm),
							password: value,
						},
					});
				},
			}),
			ButtonOk: new Button({
				label: "Авторизоваться",
				type: "primary",
				isLoading: props.isLoading,
				attrs: {
					type: "button",
				},
				onClick: () => {
					const login = this.children.InputLogin.value();
					const password = this.children.InputPassword.value();
					const errorLogin = validateField("login", login);
					const errorPassword = validateField("password", password);

					if (errorLogin) {
						this.children.InputLogin.setProps({
							error: errorLogin,
						});
					}

					if (errorPassword) {
						this.children.InputPassword.setProps({
							error: errorPassword,
						});
					}

					if (errorLogin || errorPassword) return;

					const data: ILoginForm = {
						login,
						password,
					};

					authServices.login(data);
				},
			}),
			ButtonCancel: new LinkButton({
				label: "Нет аккаунта?",
				type: "primary",
				onClick: () => {
					const router = window.router;
					router.go(ROUTES.register);
				},
			}),
		});
	}

	render(): string {
		return `
			{{{ InputLogin }}}
			{{{ InputPassword }}}
			{{#if loginError}}
				<p class="error">{{ loginError }}</p>
			{{/if}}
			<div class="auth-form__buttons">
				{{{ ButtonOk }}}
				{{{ ButtonCancel }}}
			</div>
		`;
	}
}

class LoginPage extends Block {
	constructor(props: ILoginPageProps) {
		super("main", {
			...props,
			classList: "page auth-page",
			AuthLayout: new AuthLayout({
				title: "Логин",
				Content: new AuthContentBlock({ ...props }),
			}),
		});
	}

	public render(): string {
		return `
      {{{ AuthLayout }}}
    `;
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		isLoading: state.isLoading,
// 		loadingError: state.loadingError,
// 	};
// };

const AuthContentBlock = connect(({ isLoading, loginError }) => ({
	isLoading,
	loginError,
}))(AuthContent);

export default withRouter(LoginPage);
