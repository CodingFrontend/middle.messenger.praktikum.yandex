import Block from "@/core/block";
import { validateField } from "@/utils/validate";
import {
	GoBack,
	Avatar,
	CustomInput,
	LinkButton,
	Button,
	ChangeAvatarModal,
} from "@/components";
import { withRouter } from "@/utils/withRouter";
import * as profileServices from "@/services/profile";
import * as authServices from "@/services/auth";
import { connect } from "@/utils/connect";
import { checkPasswordRepeat } from "@/utils/rules";
import { UserDTO, UserPasswordRequestData } from "@/api/types";

interface IEditPasswordForm {
	old_password: string;
	new_password: string;
	new_password_repeat: string;
}

interface IProfileUserProps {
	isGeneralInfo: boolean;
	isEditInfo: boolean;
	isEditPassword: boolean;
	fileUploaded: boolean;
	emptyError: string;
	fileName: string;
	uploadError: boolean;
	password: string;
	image: string;
	updateAvatarError: string;
}

type IEditInfoForm = Omit<UserDTO, "avatar" | "id">;

interface IProfileContentProps {
	user: UserDTO;
	editInfoForm: IEditInfoForm;
	editPasswordForm: IEditPasswordForm;
	updateAvatarSuccess: string;
}

interface AvatarEditSlotProps {
	onClick?: (e: Event) => void;
}

class AvatarEditSlot extends Block {
	constructor(props: AvatarEditSlotProps) {
		super("div", {
			...props,
			events: {
				click: props.onClick,
			},
		});
	}
	render(): string {
		return `
			<div class="profile-page-avatar-image">
			</div>
			<div class="profile-page-avatar-image__hover">
				<span>Поменять аватар</span>
			</div>
		`;
	}
}

class ProfileContentBlock extends Block {
	constructor(props: IProfileContentProps) {
		super("div", {
			...props,
			editInfoForm: {
				email: "",
				login: "",
				first_name: "",
				second_name: "",
				display_name: "",
				phone: "",
			},
			editPasswordForm: {
				old_password: "",
				new_password: "",
				new_password_repeat: "",
			},
			classList: "profile-page-card",
			isEditPassword: false,
			isEditInfo: false,
			AvatarGeneralInfo: new Avatar({
				image: props.user.avatar,
				size: "large",
				Slot: new AvatarEditSlot({
					onClick: () => this.setProps({ showChangeAvatarModal: true }),
				}),
			}),
			Avatar: new Avatar({
				image: props.user.avatar,
				size: "large",
			}),
			InputEmail: new CustomInput({
				label: "Почта",
				value: props.user.email,
				name: "email",
				type: "email",
				disabled: true,
			}),
			InputLogin: new CustomInput({
				label: "Логин",
				value: props.user.login || "",
				name: "login",
				type: "text",
				disabled: true,
			}),
			InputFirstName: new CustomInput({
				label: "Имя",
				value: props.user.first_name || "",
				name: "first_name",
				type: "text",
				disabled: true,
			}),
			InputLastName: new CustomInput({
				label: "Фамилия",
				value: props.user.second_name || "",
				name: "second_name",
				type: "text",
				disabled: true,
			}),
			InputDisplayName: new CustomInput({
				label: "Имя в чате",
				value: props.user.display_name || "",
				name: "display_name",
				type: "text",
				disabled: true,
			}),
			InputPhone: new CustomInput({
				label: "Телефон",
				value: props.user.phone || "",
				name: "phone",
				type: "phone",
				disabled: true,
			}),
			InputEmailEdit: new CustomInput({
				label: "Почта",
				value: props.user.email || "",
				name: "email",
				type: "email",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("email", value);

					this.children.InputEmailEdit.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editInfoForm: {
							...(this.props as IProfileContentProps).editInfoForm,
							email: value,
						},
					});
				},
			}),
			InputLoginEdit: new CustomInput({
				label: "Логин",
				value: props.user.login || "",
				name: "login",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("login", value);

					this.children.InputLoginEdit.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editInfoForm: {
							...(this.props as IProfileContentProps).editInfoForm,
							login: value,
						},
					});
				},
			}),
			InputFirstNameEdit: new CustomInput({
				label: "Имя",
				value: props.user.first_name || "",
				name: "first_name",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("first_name", value);

					this.children.InputFirstNameEdit.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editInfoForm: {
							...(this.props as IProfileContentProps).editInfoForm,
							first_name: value,
						},
					});
				},
			}),
			InputLastNameEdit: new CustomInput({
				label: "Фамилия",
				value: props.user.second_name || "",
				name: "second_name",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("second_name", value);

					this.children.InputLastNameEdit.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editInfoForm: {
							...(this.props as IProfileContentProps).editInfoForm,
							second_name: value,
						},
					});
				},
			}),
			InputDisplayNameEdit: new CustomInput({
				label: "Имя в чате",
				value: props.user.display_name || "",
				name: "display_name",
				type: "text",
			}),
			InputPhoneEdit: new CustomInput({
				label: "Телефон",
				value: props.user.phone,
				name: "phone",
				type: "phone",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("phone", value);

					this.children.InputPhoneEdit.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editInfoForm: {
							...(this.props as IProfileContentProps).editInfoForm,
							phone: value,
						},
					});
				},
			}),
			InputOldPassword: new CustomInput({
				label: "Старый пароль",
				value: "",
				name: "old_password",
				type: "password",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;

					this.setProps({
						editPasswordForm: {
							...(this.props as IProfileContentProps).editPasswordForm,
							old_password: value,
						},
					});
				},
			}),
			InputNewPassword: new CustomInput({
				label: "Новый пароль",
				value: "",
				name: "new_password",
				type: "password",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("password", value);

					this.children.InputNewPassword.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editPasswordForm: {
							...(this.props as IProfileContentProps).editPasswordForm,
							new_password: value,
						},
					});
				},
			}),
			InputNewPasswordRepeat: new CustomInput({
				label: "Повторите новый пароль",
				value: "",
				name: "new_password_repeat",
				type: "password",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const password = this.children.InputNewPassword.value();

					const error = checkPasswordRepeat(password, value);

					this.children.InputNewPasswordRepeat.setProps({
						error,
					});

					if (error) return;

					this.setProps({
						editPasswordForm: {
							...(this.props as IProfileContentProps).editPasswordForm,
							new_password_repeat: value,
						},
					});
				},
			}),
			LinkButtonBlurInfo: new LinkButton({
				label: "Изменить данные",
				type: "primary",
				onClick: (e) => {
					e.preventDefault();
					this.setProps({ isEditInfo: true });
				},
			}),
			LinkButtonBlurPassword: new LinkButton({
				label: "Изменить пароль",
				type: "primary",
				onClick: (e) => {
					e.preventDefault();
					this.setProps({ isEditPassword: true });
				},
			}),
			LinkButtonLogout: new LinkButton({
				label: "Выйти",
				type: "attention",
				onClick: (e) => {
					e.preventDefault();
					authServices.logout();
				},
			}),
			ButtonConfirmEditInfo: new Button({
				label: "Сохранить",
				type: "primary",
				attrs: {
					type: "button",
				},
				onClick: () => {
					const login = this.children.InputLoginEdit.value();
					const email = this.children.InputEmailEdit.value();
					const first_name = this.children.InputFirstNameEdit.value();
					const second_name = this.children.InputLastNameEdit.value();
					const display_name = this.children.InputDisplayNameEdit.value();
					const phone = this.children.InputPhoneEdit.value();

					const errorLogin = validateField("login", login);
					const errorEmail = validateField("email", email);
					const errorFirstName = validateField("first_name", first_name);
					const errorSecondName = validateField("second_name", second_name);
					const errorDisplayName = validateField("display_name", display_name);
					const errorPhone = validateField("phone", phone);

					if (errorLogin) {
						this.children.InputLoginEdit.setProps({
							error: errorLogin,
						});
					}

					if (errorEmail) {
						this.children.InputEmailEdit.setProps({
							error: errorEmail,
						});
					}

					if (errorFirstName) {
						this.children.InputFirstNameEdit.setProps({
							error: errorFirstName,
						});
					}

					if (errorSecondName) {
						this.children.InputLastNameEdit.setProps({
							error: errorSecondName,
						});
					}

					if (errorPhone) {
						this.children.InputPhoneEdit.setProps({
							error: errorPhone,
						});
					}

					if (errorDisplayName) {
						this.children.InputDisplayNameEdit.setProps({
							error: errorDisplayName,
						});
					}

					if (
						errorLogin ||
						errorEmail ||
						errorFirstName ||
						errorSecondName ||
						errorPhone ||
						errorDisplayName
					)
						return;

					const data: IEditInfoForm = {
						login,
						email,
						first_name,
						second_name,
						display_name,
						phone,
					};

					profileServices.updateInfo(data);
				},
			}),
			ButtonConfirmEditPassword: new Button({
				label: "Сохранить",
				type: "primary",
				attrs: {
					type: "button",
				},
				onClick: () => {
					const oldPassword = this.children.InputOldPassword.value();
					const newPassword = this.children.InputNewPassword.value();
					const newPasswordRepeat =
						this.children.InputNewPasswordRepeat.value();

					const errorPassword = validateField("password", newPassword);
					const errorPasswordRepeat = checkPasswordRepeat(
						newPassword,
						newPasswordRepeat
					);

					if (errorPassword) {
						this.children.InputNewPassword.setProps({
							error: errorPassword,
						});
					}

					if (errorPasswordRepeat) {
						this.children.InputNewPasswordRepeat.setProps({
							error: errorPasswordRepeat,
						});
					}

					if (errorPassword || errorPasswordRepeat) return;

					const data: UserPasswordRequestData = {
						oldPassword,
						newPassword,
					};

					profileServices.updatePassword(data);
				},
			}),
			ChangeAvatarModal: new ChangeAvatarModal({
				fileName: "",
				uploadError: "",
				onCloseModal: () => this.setProps({ showChangeAvatarModal: false }),
				onCancel: () => this.setProps({ showChangeAvatarModal: false }),
				onConfirm: async (file: File) => {
					await profileServices.updateAvatar(file);
					if (!(this.props as IProfileUserProps).updateAvatarError) {
						this.setProps({ showChangeAvatarModal: false });
					}
				},
			}),
		});
	}

	public componentDidUpdate(
		oldProps: IProfileContentProps,
		newProps: IProfileContentProps
	): boolean {
		if (
			newProps.updateAvatarSuccess &&
			newProps.updateAvatarSuccess !== oldProps.updateAvatarSuccess
		) {
			const { user } = window.store.getState();

			this.children.AvatarGeneralInfo.setProps({
				image: user.avatar,
			});
		}
		return true;
	}

	public render(): string {
		return `
			{{#ifCond isEditInfo isEditPassword}}
				<div class="profile-page-avatar">
					{{{ AvatarGeneralInfo }}}
					{{#if display_name}}
						<p class="profile-page-avatar-name">{{display_name}}</p>
					{{/if}}
				</div>
			{{else}}
				<div class="profile-page-avatar">
					{{{ Avatar }}}
				</div>
			{{/ifCond}}

				
			{{#if isEditInfo}}
			<form class="profile-edit-info" action="javascript:void(0);">
				<div class="profile-edit-info__content">
					<div class="profile-row">
						{{{ InputEmailEdit }}}
					</div>
					<div class="profile-row">
						{{{ InputLoginEdit }}}
					</div>
					<div class="profile-row">
						{{{ InputFirstNameEdit }}}
					</div>
					<div class="profile-row">
						{{{ InputLastNameEdit }}}
					</div>
					<div class="profile-row">
						{{{ InputDisplayNameEdit }}}
					</div>
					<div class="profile-row">
						{{{ InputPhoneEdit }}}
					</div>
				</div>
				{{#if updateInfoError}}
					<p class="error">{{ updateInfoError }}</p>
				{{/if}}
				<div class="profile-edit-info__confirm-button">
					{{{ ButtonConfirmEditInfo }}}
				</div>
			</form>
			{{else if isEditPassword}}
			<form class="profile-edit-password" action="javascript:void(0);">
				<div class="profile-edit-password__content">
					<div class="profile-row">
						{{{ InputOldPassword }}}
					</div>
					<div class="profile-row">
						{{{ InputNewPassword }}}
					</div>
					<div class="profile-row">
						{{{ InputNewPasswordRepeat }}}
					</div>
				</div>
				{{#if updatePasswordError}}
					<p class="error">{{ updatePasswordError }}</p>
				{{/if}}
				<div class="profile-edit-info__confirm-button">
					{{{ ButtonConfirmEditPassword }}}
				</div>
			</form>
			{{ else }}
			 <div class="profile-info">
					<div class="profile-row">
						{{{ InputEmail }}}
					</div>
					<div class="profile-row">
						{{{ InputLogin }}}
					</div>
					<div class="profile-row">
						{{{ InputFirstName }}}
					</div>
					<div class="profile-row">
						{{{ InputLastName }}}
					</div>
					<div class="profile-row">
						{{{ InputDisplayName }}}
					</div>
					<div class="profile-row">
						{{{ InputPhone }}}
					</div>
				</div>
				<div class="profile-actions">
					<div class="profile-row">
						{{{ LinkButtonBlurInfo }}}
					</div>
					<div class="profile-row">
						{{{ LinkButtonBlurPassword }}}
					</div>
					<div class="profile-row">
						{{{ LinkButtonLogout }}}
					</div>
				</div>
			{{/if}}

			{{#if showChangeAvatarModal}}
				{{{ ChangeAvatarModal }}}
			{{/if}}
		`;
	}
}

class ProfilePage extends Block {
	constructor(props: IProfileUserProps) {
		super("main", {
			...props,
			classList: "page profile-page",
			GoBack: new GoBack({
				onClick: () => {
					if (
						(this.children.ProfileContent.props as IProfileUserProps)
							.isEditPassword
					) {
						this.children.ProfileContent.setProps({
							isEditPassword: false,
						});
					} else if (
						(this.children.ProfileContent.props as IProfileUserProps).isEditInfo
					) {
						this.children.ProfileContent.setProps({
							isEditInfo: false,
						});
					} else {
						window.router.back();
					}
				},
			}),
			ProfileContent: new ProfileContent({} as IProfileContentProps),
		});
	}

	public render(): string {
		return `
		<div class="profile-page-wrapper">
      {{{ GoBack }}}
			<div class="profile-page-content">
				{{{ ProfileContent }}}
			</div>
		</div>
    `;
	}
}

const ProfileContent = connect(
	({
		isLoading,
		updateInfoError,
		updateAvatarError,
		updatePasswordError,
		updateAvatarSuccess,
		user,
	}) => ({
		isLoading,
		updateInfoError,
		updateAvatarError,
		updatePasswordError,
		updateAvatarSuccess,
		user,
	})
)(ProfileContentBlock);

export default withRouter(ProfilePage);
