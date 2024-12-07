import Block from "@/core/block";
import { AuthLayout } from "@/layouts/auth";
import { Input, Button, LinkButton } from "@/components";
import { validateField } from "@/utils/validate";
import { ROUTES } from "@/constants";
import { withRouter } from "@/utils/withRouter";
import * as authServices from "@/services/auth";
import { connect } from "@/utils/connect";

interface ILoginForm {
	login: "";
	password: "";
}

interface IErrors {
	login: "";
	password: "";
}

class AuthContent extends Block {
	constructor(props) {
		super("div", {
			...props,
			loginForm: {
				login: "",
				password: "",
			},
			errors: {
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

					this.setProps({
						errors: {
							...(this.props.errors as IErrors),
							login: error,
						},
					});

					if (error) return;

					this.setProps({
						loginForm: {
							...(this.props.loginForm as ILoginForm),
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

					this.setProps({
						errors: {
							...(this.props.errors as IErrors),
							password: error,
						},
					});

					if (error) return;

					this.setProps({
						loginForm: {
							...(this.props.loginForm as ILoginForm),
							password: value,
						},
					});
				},
			}),
			ButtonOk: new Button({
				label: "Авторизоваться",
				type: "primary",
				attrs: {
					type: "button",
				},
				onClick: () => {
					setTimeout(() => {
						for (const key in this.props.errors as IErrors) {
							if (this.props.errors[key]) return;
						}

						authServices.login(this.props.loginForm);
					}, 0);
				},
			}),
			ButtonCancel: new LinkButton({
				label: "Нет аккаунта?",
				type: "primary",
				onClick: () => {
					this.props.router.go(ROUTES.register);
				},
			}),
		});
	}

	render(): string {
		return `
			{{{ InputLogin }}}
			{{{ InputPassword }}}
			{{#if loginError}}
				<p>{{ loginError }}</p>
			{{/if}}
			<div class="auth-form__buttons">
				{{{ ButtonOk }}}
				{{{ ButtonCancel }}}
			</div>
		`;
	}
}

class LoginBlock extends Block {
	constructor(props) {
		super("main", {
			...props,
			classList: "page auth-page",
			AuthLayout: new AuthLayout({
				title: "Логин",
				Content: new AuthContent({ ...props }),
			}),
		});
	}

	public render(): string {
		return `
      {{#if isLoading}}
				<h1>spinner</h1>
      {{/if}}
      {{{ AuthLayout }}}
    `;
	}
}

const LoginPage = connect(({ isLoading, loginError }) => ({
	isLoading,
	loginError,
}))(LoginBlock);

export default withRouter(LoginPage);
