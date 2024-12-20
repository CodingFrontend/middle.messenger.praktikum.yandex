import Block from "@/core/block";
import { Modal, Search } from "@/components";
import { connect } from "@/utils/connect";
import { validateField } from "@/utils/validate";
import { UserDTO } from "@/api/types";
import * as profileServices from "@/services/profile";

interface IModalProps {
	modalTitle: string;
	modalButtonLabelOk: string;
	AddUsersError: string;
	DeleteUsersError: string;
	searchByLoginError: string;
	addUsersList: { id: number; value: string; text: string }[] | [];
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
	searchByLoginError: string;
	errors: {
		login: string;
	};
	form: {
		login: string;
	};
	addUsersList: { id: number; value: string; text: string }[] | [];
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
			Search: new Search({
				label: "Логин",
				name: "login",
				id: "search-login",
				error: props.searchByLoginError,
				options: [
					{
						id: 1831,
						first_name: "New",
						second_name: "N",
						display_name: null,
						login: "NewUser42",
						avatar: null,
					},
				],
				onKeydown: async () => {
					setTimeout(async () => {
						const searchValue = this.children.Search.value();

						await profileServices.searchByLogin({ login: searchValue });

						console.log(1, searchValue);

						// this.setProps({
						// 	form: {
						// 		...((this.props as IDialogBodyProps).form as IForm),
						// 		login: value,
						// 	},
						// });
					}, 1000);
				},
			}),
		});
	}

	render(): string {
		return `{{{ Search }}}`;
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
					this.children.Modal.children.Body.children.Search.clear();
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
		}

		if (newProps.searchByLoginError !== oldProps.searchByLoginError) {
			this.children.Modal.children.Body.children.Search.setProps({
				error: newProps.searchByLoginError,
			});
		}

		if (newProps.addUsersList !== oldProps.addUsersList) {
			this.children.Modal.children.Body.children.Search.setProps({
				options: newProps.addUsersList,
			});
		}

		return true;
	}

	public render(): string {
		return `{{{ Modal }}}`;
	}
}

const ChatModal = connect(
	({ AddUsersError, DeleteUsersError, addUsersList, searchByLoginError }) => ({
		AddUsersError,
		DeleteUsersError,
		addUsersList,
		searchByLoginError,
	})
)(ChatModalBlock);

export default ChatModal;
