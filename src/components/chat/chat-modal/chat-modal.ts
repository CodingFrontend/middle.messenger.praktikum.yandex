import Block from "@/core/block";
import { Modal, Input } from "@/components";
import { connect } from "@/utils/connect";

interface IModalProps {
	modalTitle: string;
	modalButtonLabelOk: string;
	AddUsersError: string;
	DeleteUsersError: string;
	onCloseModal: () => void;
	onConfirm: () => void;
	onCancel?: () => void;
}

interface IForm {
	login: string;
}

export interface IErrors {
	login: string;
}

type IDialogBodyProps = {
	errors: {
		login: string;
	};
	form: {
		login: string;
	};
} & {};

class DialogBody extends Block {
	constructor(props: IDialogBodyProps) {
		super("div", {
			...props,
			form: {
				login: "",
			},
			errors: {
				login: "",
			},
			classList: "modal-dialog__content",
			Input: new Input({
				label: "Id пользователя",
				name: "login",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					// const error = validateField("login", value);

					// this.children.Input.setProps({
					// 	error,
					// });

					// this.setProps({
					// 	errors: {
					// 		...((this.props as IDialogBodyProps).errors as IErrors),
					// 		login: error,
					// 	},
					// });

					// if (error) return;

					this.setProps({
						form: {
							...((this.props as IDialogBodyProps).form as IForm),
							login: value,
						},
					});
				},
			}),
		});
	}

	render(): string {
		return `{{{ Input }}}`;
	}
}

class ChatModalBlock extends Block {
	constructor(props: IModalProps) {
		super("div", {
			...props,
			classList: "chat-modal",
			Modal: new Modal({
				title: props.modalTitle,
				labelOk: props.modalButtonLabelOk,
				Body: new DialogBody({} as any),
				onCloseModal: () => {
					window.store.set({ AddUsersError: "", DeleteUsersError: "" });
					this.children.Modal.children.Body.children.Input.clear();
					props.onCloseModal();
				},
				onConfirm: () => {
					props.onConfirm();
				},
				onCancel: () => props.onCancel?.(),
			}),
		});
	}

	public componentDidUpdate(
		oldProps: IModalProps,
		newProps: IModalProps
	): boolean {
		if (
			newProps.AddUsersError !== oldProps.AddUsersError ||
			newProps.DeleteUsersError !== oldProps.DeleteUsersError
		) {
			this.children.Modal.setProps({
				error: newProps.AddUsersError || newProps.DeleteUsersError,
			});

			if (!newProps.AddUsersError && oldProps.AddUsersError) {
				this.children.Modal.setProps({
					error: newProps.AddUsersError,
				});
			}

			if (!newProps.DeleteUsersError && oldProps.DeleteUsersError) {
				this.children.Modal.setProps({
					error: newProps.DeleteUsersError,
				});
			}
		}
		return true;
	}

	public render(): string {
		return `{{{ Modal }}}`;
	}
}

const ChatModal = connect(({ AddUsersError, DeleteUsersError }) => ({
	AddUsersError,
	DeleteUsersError,
}))(ChatModalBlock);

export default ChatModal;
