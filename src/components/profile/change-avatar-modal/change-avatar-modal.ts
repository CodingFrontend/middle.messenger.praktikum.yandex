import Block from "@/core/block";
import { Modal, FileUpload } from "@/components";

interface ChangeAvatarModalProps {
	fileName?: string;
	uploadError?: string;
	emptyError?: string;
	onCloseModal: () => void;
	onConfirm?: () => void;
	onCancel?: () => void;
}

class ModalBody extends Block {
	constructor() {
		super("div", {
			classList: "avatar-modal-body",
		});
	}

	public render(): string {
		return `
			<p class="avatar-modal-file">{{fileName}}</p>
		`;
	}
}

class ModalBodyUpload extends Block {
	constructor() {
		super("div", {
			classList: "avatar-modal-body",
			FileUpload: new FileUpload({
				label: "Выберите файл на компьютере",
				onChange: () => {
					console.log(2);
					console.log(1, this.children.FileUpload.props.fileName);
				},
			}),
		});
	}

	public render(): string {
		return `
			{{#if fileName}}
			<p class="avatar-modal-file">{{fileName}}</p>
			{{/if}}
			<div class="avatar-modal-button">
				{{{ FileUpload }}}
			</div>
		`;
	}
}

export default class ChangeAvatarModal extends Block {
	constructor(props: ChangeAvatarModalProps) {
		super("div", {
			...props,
			// Modal: new Modal({
			// 	title: "Файл загружен",
			// 	labelOk: "Поменять",
			// 	error: props.emptyError,
			// 	Body: new ModalBody(),
			// 	onCloseModal: () => {
			// 		this.children.Body.children.FileUpload.clear();
			// 		props.onCloseModal();
			// 	},
			// 	onConfirm: () => {
			// 		this.children.Body.children.FileUpload.clear();
			// 		props.onConfirm?.();
			// 	},
			// 	onCancel: () => {
			// 		this.children.Body.children.FileUpload.clear();
			// 		props.onCancel?.();
			// 	},
			// }),
			// ModalError: new Modal({
			// 	title: "Ошибка, попробуйте еще раз",
			// 	labelOk: "Поменять",
			// 	error: props.emptyError,
			// 	Body: new ModalBodyUpload({}),
			// 	onCloseModal: () => props.onCloseModal(),
			// 	onConfirm: () => props.onConfirm?.(),
			// 	onCancel: () => props.onCancel?.(),
			// }),
			ModalUpload: new Modal({
				title: "Загрузите файл",
				labelOk: "Поменять",
				error: props.emptyError,
				Body: new ModalBodyUpload({}),
				onCloseModal: () => {
					console.log(3);
					// this.children.Body.children.FileUpload.clear();
					props.onCloseModal();
				},
				onCancel: () => props.onCancel?.(),
				onConfirm: () => props.onConfirm?.(),
			}),
		});
	}

	public render(): string {
		return `
			{{{ ModalUpload }}}
		`;
	}
}
