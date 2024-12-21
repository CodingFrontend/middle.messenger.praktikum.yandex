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
	AddUsersError: string;
	DeleteUsersError: string;
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
					this.children.ChatModalAdd.children.Modal.setProps({
						success: false,
					});
					props.onCloseModal();
				},
				onConfirm: async () => {
					const login =
						this.children.ChatModalAdd.children.Modal.children.Body.children.Search.selectedValue();

					if (login) {
						await chatServices.addUsers({
							users: [login],
							chatId: (this.props as IChatWidgetProps).activeChatId,
						});
						if (!(this.props as IChatWidgetProps).AddUsersError) {
							this.children.ChatModalAdd.children.Modal.setProps({
								success: true,
							});
						}
					}
				},
			}),
			ChatModalDelete: new ChatModal({
				modalTitle: "Удалить пользователя",
				modalButtonLabelOk: "Удалить",
				onCloseModal: () => {
					this.setProps({ showModalDelete: false });
					this.children.ChatModalAdd.children.Modal.setProps({
						success: false,
					});
					props.onCloseModal();
				},
				onConfirm: async () => {
					const login =
						this.children.ChatModalAdd.children.Modal.children.Body.children.Search.selectedValue();
					if (login) {
						await chatServices.deleteUsers({
							users: [login],
							chatId: (this.props as IChatWidgetProps).activeChatId,
						});

						if (!(this.props as IChatWidgetProps).DeleteUsersError) {
							this.children.ChatModalAdd.children.Modal.setProps({
								success: true,
							});
						}
					}
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
