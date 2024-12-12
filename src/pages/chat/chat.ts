import Block from "@/core/block";
import {
	LinkButton,
	ChatList,
	ChatDialog,
	Button,
	Modal,
	Input,
	Loader,
} from "@/components";

import { ROUTES } from "@/constants";
import { withRouter } from "@/utils/withRouter";
import * as chatServices from "@/services/chat";
import { connect } from "@/utils/connect";

class ModalBody extends Block {
	constructor() {
		super("div", {
			classList: "add-chat-modal-body",
			Input: new Input({
				label: "Название чата",
				name: "title",
				type: "title",
			}),
		});
	}

	public render(): string {
		return `
			{{{ Input }}}
		`;
	}
}

class Chat extends Block {
	constructor(props) {
		super("main", {
			...props,
			classList: "page chat-page",
			searchValue: "",
			LinkButton: new LinkButton({
				label: "Профиль",
				type: "secondary",
				onClick: () => props.router.go(ROUTES.profile),
			}),
			ButtonCreateChat: new Button({
				label: "Создать чат",
				type: "primary",
				attrs: {
					type: "button",
				},
				onClick: () => this.setProps({ showCreateChatModal: true }),
			}),
			ChatList: new ChatList({
				items: props.chatListItems,
			}),
			ChatDialog: new ChatDialog({}),
			Modal: new Modal({
				title: "Создать чат",
				labelOk: "Создать",
				error: props.createChatError,
				Body: new ModalBody(),
				onCloseModal: () => this.setProps({ showCreateChatModal: false }),
				onConfirm: async () => {
					const title =
						this.children.Modal.children.Body.children.Input.value();
					await chatServices.createChat({ title });
					if (!this.props.createChatError) {
						this.setProps({ showCreateChatModal: false });
					}
				},
				onCancel: () => this.setProps({ showCreateChatModal: false }),
			}),
			Loader: new Loader(),
		});
	}

	public render(): string {
		return `
      {{#if isChatListLoading}}
				{{{ Loader }}}
			{{ else }}
				<div class='chat-left'>
					<div class='chat-left__top'>
						<div class="chat-left__profile-link">
							{{{ LinkButton }}}
							<span class="arrow"></span>
						</div>
					</div>
					<div class='chat-left__button'>
						{{{ ButtonCreateChat }}}
					</div>
					<div class='chat-left__content'>
						{{{ ChatList }}}
					</div>
				</div>
				<div class='chat-content'>
					{{{ ChatDialog }}}
				</div>
      {{/if}}
			{{#if showCreateChatModal}}
				{{{ Modal }}}
			{{/if}}
    `;
	}
}

const ChatPage = connect(
	({
		isCreateChatLoading,
		createChatError,
		isChatListLoading,
		chatListError,
		chatListItems,
	}) => ({
		isCreateChatLoading,
		createChatError,
		isChatListLoading,
		chatListError,
		chatListItems,
	})
)(Chat);

export default withRouter(ChatPage);
