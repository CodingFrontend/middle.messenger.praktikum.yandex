import Block from '@/core/block';

import { validateField } from '@/utils/validate';

import {
  GoBack,
  Avatar,
  CustomInput,
  LinkButton,
  Button,
  ChangeAvatarModal,
} from '@/components';

import mockData from './mockData';

interface IEditInfoForm {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

interface IEditInfoFormErrors {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

interface IEditPasswordForm {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
}

interface IEditPasswordFormErrors {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
}

interface IProfileContentProps extends IEditInfoForm {
  isGeneralInfo: boolean;
  isEditInfo: boolean;
  isEditPassword: boolean;
  fileUploaded: boolean;
  emptyError: string;
  fileName: string;
  uploadError: boolean;
  password: string;
  image: string;
}

interface AvatarEditSlotProps {
  onClick?: (e: Event) => void;
}

class AvatarEditSlot extends Block {
  constructor(props: AvatarEditSlotProps) {
    super('div', {
      ...props,
      classList: 'profile-page-avatar-image',
      events: {
        click: props.onClick,
      },
    });
  }
  render(): string {
    return `
			<div class="profile-page-avatar-image__hover">
				<span>Поменять аватар</span>
			</div>
		`;
  }
}

class ProfileContent extends Block {
  constructor(props: IProfileContentProps) {
    super('div', {
      ...props,
      editInfoForm: {
        email: props.email,
        login: props.login,
        first_name: props.first_name,
        second_name: props.second_name,
        display_name: props.display_name,
        phone: props.phone,
      },
      editInfoFormErrors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      editPasswordForm: {
        old_password: '',
        new_password: '',
        new_password_repeat: '',
      },
      editPasswordFormErrors: {
        old_password: '',
        new_password: '',
        new_password_repeat: '',
      },
      classList: 'profile-page-card',
      AvatarGeneralInfo: new Avatar({
        image: props.image,
        size: 'large',
        Slot: new AvatarEditSlot({
          onClick: () => this.setProps({ showChangeAvatarModal: true }),
        }),
      }),
      Avatar: new Avatar({
        image: props.image,
        size: 'large',
      }),
      InputEmail: new CustomInput({
        label: 'Почта',
        value: props.email,
        name: 'email',
        type: 'email',
        disabled: true,
      }),
      InputLogin: new CustomInput({
        label: 'Логин',
        value: props.login,
        name: 'login',
        type: 'text',
        disabled: true,
      }),
      InputFirstName: new CustomInput({
        label: 'Имя',
        value: props.first_name,
        name: 'first_name',
        type: 'text',
        disabled: true,
      }),
      InputLastName: new CustomInput({
        label: 'Фамилия',
        value: props.second_name,
        name: 'second_name',
        type: 'text',
        disabled: true,
      }),
      InputDisplayName: new CustomInput({
        label: 'Имя в чате',
        value: props.display_name,
        name: 'display_name',
        type: 'text',
        disabled: true,
      }),
      InputPhone: new CustomInput({
        label: 'Телефон',
        value: props.phone,
        name: 'phone',
        type: 'phone',
        disabled: true,
      }),
      InputEmailEdit: new CustomInput({
        label: 'Почта',
        value: props.email,
        name: 'email',
        type: 'email',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('email', value);

          this.children.InputEmailEdit.setProps({
            error,
          });

          this.setProps({
            editInfoFormErrors: {
              ...(this.props.editInfoFormErrors as IEditInfoFormErrors),
              email: error,
            },
          });

          if (error) return;

          this.setProps({
            editInfoForm: {
              ...(this.props.editInfoForm as IEditInfoForm),
              email: value,
            },
          });
        },
      }),
      InputLoginEdit: new CustomInput({
        label: 'Логин',
        value: props.login,
        name: 'login',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('login', value);

          this.children.InputLoginEdit.setProps({
            error,
          });

          this.setProps({
            editInfoFormErrors: {
              ...(this.props.editInfoFormErrors as IEditInfoFormErrors),
              login: error,
            },
          });

          if (error) return;

          this.setProps({
            editInfoForm: {
              ...(this.props.editInfoForm as IEditInfoForm),
              login: value,
            },
          });
        },
      }),
      InputFirstNameEdit: new CustomInput({
        label: 'Имя',
        value: props.first_name,
        name: 'first_name',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('first_name', value);

          this.children.InputFirstNameEdit.setProps({
            error,
          });

          this.setProps({
            editInfoFormErrors: {
              ...(this.props.editInfoFormErrors as IEditInfoFormErrors),
              first_name: error,
            },
          });

          if (error) return;

          this.setProps({
            editInfoForm: {
              ...(this.props.editInfoForm as IEditInfoForm),
              first_name: value,
            },
          });
        },
      }),
      InputLastNameEdit: new CustomInput({
        label: 'Фамилия',
        value: props.second_name,
        name: 'second_name',
        type: 'text',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('second_name', value);

          this.children.InputLastNameEdit.setProps({
            error,
          });

          this.setProps({
            editInfoFormErrors: {
              ...(this.props.editInfoFormErrors as IEditInfoFormErrors),
              second_name: error,
            },
          });

          if (error) return;

          this.setProps({
            editInfoForm: {
              ...(this.props.editInfoForm as IEditInfoForm),
              second_name: value,
            },
          });
        },
      }),
      InputDisplayNameEdit: new CustomInput({
        label: 'Имя в чате',
        value: props.display_name,
        name: 'display_name',
        type: 'text',
      }),
      InputPhoneEdit: new CustomInput({
        label: 'Телефон',
        value: props.phone,
        name: 'phone',
        type: 'phone',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('phone', value);

          this.children.InputPhoneEdit.setProps({
            error,
          });

          this.setProps({
            editInfoFormErrors: {
              ...(this.props.editInfoFormErrors as IEditInfoFormErrors),
              phone: error,
            },
          });

          if (error) return;

          this.setProps({
            editInfoForm: {
              ...(this.props.editInfoForm as IEditInfoForm),
              phone: value,
            },
          });
        },
      }),
      InputOldPassword: new CustomInput({
        label: 'Старый пароль',
        value: '',
        name: 'old_password',
        type: 'password',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = '';

          if (this.props.password !== value) error = 'Неверный пароль';

          this.children.InputOldPassword.setProps({
            error,
          });

          this.setProps({
            editPasswordFormErrors: {
              ...(this.props.editPasswordFormErrors as IEditPasswordFormErrors),
              old_password: error,
            },
          });

          if (error) return;

          this.setProps({
            editPasswordForm: {
              ...(this.props.editPasswordForm as IEditPasswordForm),
              old_password: value,
            },
          });
        },
      }),
      InputNewPassword: new CustomInput({
        label: 'Новый пароль',
        value: '',
        name: 'new_password',
        type: 'password',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          const error = validateField('password', value);

          this.children.InputNewPassword.setProps({
            error,
          });

          this.setProps({
            editPasswordFormErrors: {
              ...(this.props.editPasswordFormErrors as IEditPasswordFormErrors),
              new_password: error,
            },
          });

          if (error) return;

          this.setProps({
            editPasswordForm: {
              ...(this.props.editPasswordForm as IEditPasswordForm),
              new_password: value,
            },
          });
        },
      }),
      InputNewPasswordRepeat: new CustomInput({
        label: 'Повторите новый пароль',
        value: '',
        name: 'new_password_repeat',
        type: 'password',
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          let error = '';

          if (
            this.props.editPasswordForm &&
            (this.props.editPasswordForm as IEditPasswordForm).new_password !==
              value
          )
            error = 'Пароли не совпадают';

          this.children.InputNewPasswordRepeat.setProps({
            error,
          });

          this.setProps({
            editPasswordFormErrors: {
              ...(this.props.editPasswordForm as IEditPasswordFormErrors),
              new_password_repeat: error,
            },
          });

          if (error) return;

          this.setProps({
            editPasswordForm: {
              ...(this.props.editPasswordForm as IEditPasswordForm),
              new_password_repeat: value,
            },
          });
        },
      }),
      LinkButtonBlurInfo: new LinkButton({
        label: 'Изменить данные',
        type: 'primary',
        onClick: (e) => {
          e.preventDefault();
          this.setProps({ isEditInfo: true });
        },
      }),
      LinkButtonBlurPassword: new LinkButton({
        label: 'Изменить пароль',
        type: 'primary',
        onClick: (e) => {
          e.preventDefault();
          this.setProps({ isEditPassword: true });
        },
      }),
      LinkButtonLogout: new LinkButton({
        label: 'Выйти',
        type: 'attention',
      }),
      ButtonConfirmEditInfo: new Button({
        label: 'Сохранить',
        type: 'primary',
        attrs: {
          type: 'button',
        },
        onClick: () => {
          setTimeout(() => {
            for (const key in this.props
              .editInfoFormErrors as IEditInfoFormErrors) {
              if (this.props.editInfoFormErrors[key]) return;
            }

            console.log(this.props.editInfoForm);
          }, 0);
        },
      }),
      ButtonConfirmEditPassword: new Button({
        label: 'Сохранить',
        type: 'primary',
        attrs: {
          type: 'button',
        },
        onClick: () => {
          setTimeout(() => {
            for (const key in this.props
              .editPasswordFormErrors as IEditPasswordFormErrors) {
              if (this.props.editPasswordFormErrors[key]) return;
            }

            console.log(this.props.editPasswordForm);
          }, 0);
        },
      }),
      ChangeAvatarModal: new ChangeAvatarModal({
        fileName: '',
        uploadError: '',
        onCloseModal: () => this.setProps({ showChangeAvatarModal: false }),
      }),
    });
  }

  render(): string {
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
			<form class="profile-edit-info">
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
				<div class="profile-edit-info__confirm-button">
					{{{ ButtonConfirmEditInfo }}}
				</div>
			</form>
			{{else if isEditPassword}}
			<form class="profile-edit-password">
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

export default class ProfilePage extends Block {
  constructor() {
    super('main', {
      classList: 'page profile-page',
      GoBack: new GoBack(),
      ProfileContent: new ProfileContent({ ...mockData }),
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
