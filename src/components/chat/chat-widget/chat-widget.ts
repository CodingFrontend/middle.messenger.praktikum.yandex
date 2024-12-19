import Block from "@/core/block";
import { IconTextButton, ChatModal } from "@/components";
import { validateField } from "@/utils/validate";
import * as chatServices from "@/services/chat";
import { connect } from "@/utils/connect";

export interface IChatWidgetItem {
	faIcon?: string;
	text: string;
	action: string;
}

interface IChatWidgetProps {
	items: IChatWidgetItem[];
	activeChatId: number;
	onCloseModal: () => void;
}

class ChatWidgetBlock extends Block {
	constructor(props: IChatWidgetProps) {
		super("ul", {
			...props,
			classList: "chat-widget",
			showModalAdd: false,
			action: "",
			widgetItems: props.items.map(
				(item: IChatWidgetItem) =>
					new IconTextButton({
						label: item.text,
						iconLeft: item.faIcon,
						onClick: () => {
							if (item.action === "add") {
								this.setProps({
									showModalAdd: true,
								});
							} else if (item.action === "remove") {
								this.setProps({
									showModalDelete: true,
								});
							}
						},
					})
			),
			ChatModalAdd: new ChatModal({
				modalTitle: "Добавить пользователя",
				modalButtonLabelOk: "Добавить",
				onCloseModal: () => {
					this.setProps({ showModalAdd: false });
					props.onCloseModal();
				},
				onConfirm: async () => {
					const login =
						this.children.ChatModalAdd.children.Modal.children.Body.children.Input.value();
					const errorLogin = validateField("login", login);

					if (errorLogin) {
						this.children.ChatModalAdd.children.Modal.children.Body.children.Input.setProps(
							{
								error: errorLogin,
							}
						);
						return;
					}

					await chatServices.addUsers({
						users: [login],
						chatId: (this.props as IChatWidgetProps).activeChatId,
					});

					props.onCloseModal();
				},
			}),
			ChatModalDelete: new ChatModal({
				modalTitle: "Удалить пользователя",
				modalButtonLabelOk: "Удалить",
				onCloseModal: () => {
					this.setProps({ showModalDelete: false });
					props.onCloseModal();
				},
				onConfirm: async () => {
					const login =
						this.children.ChatModalAdd.children.Modal.children.Body.children.Input.value();
					const errorLogin = validateField("login", login);

					if (errorLogin) {
						this.children.ChatModalAdd.children.Modal.children.Body.children.Input.setProps(
							{
								error: errorLogin,
							}
						);
						return;
					}

					await chatServices.deleteUsers({
						users: [login],
						chatId: (this.props as IChatWidgetProps).activeChatId,
					});

					props.onCloseModal();
				},
			}),
		});
	}
	public render(): string {
		return `
      {{#each widgetItems}}
				<li>
					{{{ this }}}
				</li>
			{{/each}}
			{{#if showModalAdd}}
				{{{ ChatModalAdd }}}
			{{/if}}
			{{#if showModalDelete}}
				{{{ ChatModalDelete }}}
			{{/if}}
    `;
	}
}

const ChatWidget = connect(
	({
		activeChatId,
		AddUsersError,
		isAddUsersLoading,
		isDeleteUsersLoading,
		DeleteUsersError,
	}) => ({
		activeChatId,
		AddUsersError,
		isAddUsersLoading,
		isDeleteUsersLoading,
		DeleteUsersError,
	})
)(ChatWidgetBlock);

export default ChatWidget;
