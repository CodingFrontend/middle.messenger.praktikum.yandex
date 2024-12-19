import Block from "@/core/block";
import { Modal, Input } from "@/components";
import { validateField } from "@/utils/validate";

interface IModalProps {
	modalTitle: string;
	modalButtonLabelOk: string;
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
				label: "Логин",
				name: "login",
				type: "text",
				onChange: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					const error = validateField("login", value);

					this.children.Input.setProps({
						error,
					});

					this.setProps({
						errors: {
							...((this.props as IDialogBodyProps).errors as IErrors),
							login: error,
						},
					});

					if (error) return;

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

export default class ChatModal extends Block {
	constructor(props: IModalProps) {
		super("div", {
			...props,
			classList: "chat-modal",
			Modal: new Modal({
				title: props.modalTitle,
				labelOk: props.modalButtonLabelOk,
				Body: new DialogBody({} as any),
				onCloseModal: () => props.onCloseModal(),
				onConfirm: () => {
					props.onConfirm();
				},
				onCancel: () => props.onCancel?.(),
			}),
		});
	}

	public render(): string {
		return `{{{ Modal }}}`;
	}
}
