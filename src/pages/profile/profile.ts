import Block from '@/src/core/block';

import {
  GoBack,
  Avatar,
  CustomInput,
  LinkButton,
  Button,
  ChangeAvatarModal,
} from '@/src/components';

import mockData from './mockData';

interface IProfileContentProps {
  isGeneralInfo: boolean;
  isEditInfo: boolean;
  isEditPassword: boolean;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone: string;
  showModal: boolean;
  fileUploaded: boolean;
  emptyError: string;
  fileName: string;
  uploadError: boolean;
  password: string;
  image: string;
}

class AvatarEditSlot extends Block {
  constructor() {
    super('div', {
      classList: 'profile-page-avatar-image',
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
      classList: 'profile-page-card',
      AvatarGeneralInfo: new Avatar({
        image: props.image,
        size: 'large',
        Slot: new AvatarEditSlot(),
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
        value: props.last_name,
        name: 'last_name',
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
      }),
      InputLoginEdit: new CustomInput({
        label: 'Логин',
        value: props.login,
        name: 'login',
        type: 'text',
      }),
      InputFirstNameEdit: new CustomInput({
        label: 'Имя',
        value: props.first_name,
        name: 'first_name',
        type: 'text',
      }),
      InputLastNameEdit: new CustomInput({
        label: 'Фамилия',
        value: props.last_name,
        name: 'last_name',
        type: 'text',
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
      }),
      InputOldPassword: new CustomInput({
        label: 'Старый пароль',
        value: '',
        name: 'oldPassword',
        type: 'password',
      }),
      InputNewPassword: new CustomInput({
        label: 'Новый пароль',
        value: '',
        name: 'new_password',
        type: 'password',
      }),
      InputNewPasswordRepeat: new CustomInput({
        label: 'Повторите новый пароль',
        value: '',
        name: 'new_password_repeat',
        type: 'password',
      }),
      LinkButtonChangeInfo: new LinkButton({
        label: 'Изменить данные',
        type: 'primary',
      }),
      LinkButtonChangePassword: new LinkButton({
        label: 'Изменить пароль',
        type: 'primary',
      }),
      LinkButtonLogout: new LinkButton({
        label: 'Выйти',
        type: 'attention',
      }),
      ButtonConfirm: new Button({
        label: 'Сохранить',
        type: 'primary',
      }),
      ChangeAvatarModal: new ChangeAvatarModal({
        fileName: props.fileName,
        uploadError: props.uploadError,
      }),
    });
  }

  render(): string {
    return `
			{{#if isGeneralInfo}}
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
			{{/if}}

			{{#if isGeneralInfo}}
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
			{{else if isEditInfo}}
				<div class="profile-edit-info">
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
			{{else if isEditPassword}}
				<div class="profile-edit-password">
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
			{{/if}}

			{{#if isGeneralInfo}}
				<div class="profile-actions">
					<div class="profile-row">
						{{{ LinkButtonChangeInfo }}}
					</div>
					<div class="profile-row">
						{{{ LinkButtonChangePassword }}}
					</div>
					<div class="profile-row">
						{{{ LinkButtonLogout }}}
					</div>
				</div>
			{{else}}
				<div class="profile-edit-info__confirm-button">
					{{{ ButtonConfirm }}}
				</div>
			{{/if}}

			{{#if showModal}}
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
