import Block from "@/core/block";
import { Modal, FileUpload } from "@/components";
import { connect } from "@/utils/connect";

interface ChangeAvatarModalProps {
	fileName?: string;
	uploadError?: string;
	emptyError?: string;
	onCloseModal: () => void;
	onConfirm?: (file) => void;
	onCancel?: () => void;
}

interface IModalBodyUploadProps {
	onChange?: (e: Event) => void;
}

class ModalBodyUpload extends Block {
	constructor(props: IModalBodyUploadProps) {
		super("div", {
			classList: "avatar-modal-body",
			FileUpload: new FileUpload({
				label: "Выберите файл на компьютере",
				onChange: () => props.onChange(),
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

class ChangeAvatarModalBlock extends Block {
	constructor(props: ChangeAvatarModalProps) {
		super("div", {
			...props,
			ModalUpload: new Modal({
				title: "Загрузите файл",
				labelOk: "Поменять",
				error: props.emptyError,
				Body: new ModalBodyUpload({
					onChange: () => {
						const file =
							this.children.ModalUpload.children.Body.children.FileUpload.value();
						if (file) {
							this.setProps({
								file,
							});

							this.children.ModalUpload.setProps({
								title: "Файл загружен",
							});

							this.children.ModalUpload.children.Body.setProps({
								fileName: file.name,
							});
						}
					},
				}),
				onCloseModal: () => {
					props.onCloseModal();
				},
				onCancel: () => props.onCancel?.(),
				onConfirm: () => {
					const file = this.props.file;
					props.onConfirm?.(file);
				},
			}),
		});
	}

	public async componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): Promise<boolean> {
		console.log("newProps", newProps);
		if (
			newProps.updateAvatarError &&
			newProps.updateAvatarError !== oldProps.updateAvatarError
		) {
			this.children.ModalUpload.setProps({
				title: "Ошибка, попробуйте еще раз",
			});
			this.children.ModalUpload.children.Body.setProps({
				fileName: "",
			});
		}
	}

	public render(): string {
		return `
			{{{ ModalUpload }}}
		`;
	}
}

const ChangeAvatarModal = connect(({ updateAvatarError }) => ({
	updateAvatarError,
}))(ChangeAvatarModalBlock);

export default ChangeAvatarModal;
