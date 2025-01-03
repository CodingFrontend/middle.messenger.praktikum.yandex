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
import type { ChatListRequestData, ChatListResponse } from "@/api/types";

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

interface IChatProps {
	createChatError: string;
	chatListItems: ChatListResponse[];
	activeChatId: number;
	rawChatDialog: ChatListResponse[];
	createChatSuccess: string;
}

class Chat extends Block {
	constructor(props: IChatProps) {
		super("main", {
			...props,
			classList: "page chat-page",
			searchValue: "",
			LinkButton: new LinkButton({
				label: "Профиль",
				type: "secondary",
				onClick: () => window.router.go(ROUTES.profile),
			}),
			ButtonCreateChat: new Button({
				label: "Создать чат",
				type: "primary",
				attrs: {
					type: "button",
				},
				onClick: () => this.setProps({ showCreateChatModal: true }),
			}),
			ChatDialog: new ChatDialog({}),
			Modal: new Modal({
				title: "Создать чат",
				labelOk: "Создать",
				error: props.createChatError,
				Body: new ModalBody(),
				onCloseModal: () => this.setProps({ showCreateChatModal: false }),
				onConfirm: async () => {
					const title = (
						this.children.Modal.children.Body.children.Input as unknown as Input
					).value();
					await chatServices.createChat({ title });
					await chatServices.getChatList({} as ChatListRequestData);
					if (!(this.props as IChatProps).createChatError) {
						this.setProps({ showCreateChatModal: false });
					}
				},
				onCancel: () => this.setProps({ showCreateChatModal: false }),
			}),
			Loader: new Loader(),
		});
	}

	public componentDidUpdate(
		oldProps: IChatProps,
		newProps: IChatProps
	): boolean {
		if (
			newProps.chatListItems &&
			newProps.chatListItems !== oldProps.chatListItems
		) {
			this.setProps({
				rawChatDialog: [...newProps.chatListItems],
			});

			this.setChild({
				ChatList: new ChatList({
					items: newProps.chatListItems,
					onClick: (id: number) => {
						this.setProps({ activeChatId: id });
					},
				}),
			});
		}

		if (
			newProps.createChatSuccess &&
			newProps.createChatSuccess !== oldProps.createChatSuccess
		) {
			const { chatListItems } = window.store.getState();

			this.children.ChatList.setProps({
				...this.props,
				items: chatListItems,
			});
		}

		return true;
	}

	public async componentDidMount(): Promise<void> {
		await chatServices.getChatList({} as ChatListRequestData);
	}

	public render(): string {
		const { activeChatId, rawChatDialog } = this.props as IChatProps;
		const { ChatDialog } = this.children;

		if (rawChatDialog) {
			const currentChatDialog = rawChatDialog.find(
				(item) => item.id === activeChatId
			);
			if (currentChatDialog) {
				const { title, avatar, id } = currentChatDialog;
				ChatDialog.setProps({ title, avatar, id });
			}
		}

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
				{{#if activeChatId}}
					{{{ ChatDialog }}}
				{{ else }}
					<div class="chat-content-empty">
						<p>Выберите чат чтобы отправить сообщение</p>
					</div>
				{{/if }}
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
		isChatTokenLoading,
		chatTokenError,
		createChatSuccess,
	}) => ({
		isCreateChatLoading,
		createChatError,
		isChatListLoading,
		chatListError,
		chatListItems,
		isChatTokenLoading,
		chatTokenError,
		createChatSuccess,
	})
)(Chat);

export default withRouter(ChatPage);
