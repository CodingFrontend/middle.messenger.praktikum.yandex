import Block from "@/core/block";
import {
	Avatar,
	ChatWidget,
	ChatMessageGroup,
	IconButton,
	SendMessageInput,
	Loader,
} from "@/components";
import { chatWidgetItems } from "@/mockData/chatDataMock";
import { validateField } from "@/utils/validate";
import { connect } from "@/utils/connect";
import * as chatServices from "@/services/chat";
import { formatDate, getTime } from "@/utils/formatDate";

export interface IChatDialog {
	id: string;
	title: string;
	avatar: string | null;
}

class ChatDialog extends Block {
	constructor(props: IChatDialog) {
		super("div", {
			...props,
			showChatWidget: false,
			classList: "chat-dialog",
			messages: [],
			Loader: new Loader(),
			Avatar: new Avatar({
				image: props.avatar || "",
				size: "small",
			}),
			ChatWidget: new ChatWidget({
				items: chatWidgetItems,
				onCloseModal: () => this.setProps({ showChatWidget: false }),
			}),
			ChatMessageGroup: new ChatMessageGroup({ groups: [] }),
			ChatWidgetButton: new IconButton({
				faIcon: "fa-solid fa-ellipsis-vertical",
				type: "secondary",
				onClick: () =>
					this.setProps({
						showChatWidget: !this.props.showChatWidget,
					}),
			}),
			SendMessageInput: new SendMessageInput({
				name: "message",
			}),
			SendMessageButton: new IconButton({
				faIcon: "fa-solid fa-arrow-right",
				type: "primary",
				onClick: () => {
					const value = this.children.SendMessageInput.value();
					const error = validateField("message", value);

					if (error) return;

					const socket = window.socket;

					socket.send(
						JSON.stringify({
							content: value,
							type: "message",
						})
					);

					this.children.SendMessageInput.clear();
				},
			}),
		});
	}

	public async componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): Promise<boolean> {
		if (newProps.id && newProps.id !== oldProps.id) {
			const chatId = newProps.id;
			await chatServices.getNewMessagesCount(chatId);
			await chatServices.createChatWSConnection(chatId);
		}

		const socket = window.socket;

		if (
			socket &&
			newProps.messages &&
			newProps.messages !== oldProps.messages &&
			newProps.unread_count &&
			newProps.unread_count !== oldProps.unread_count
		) {
			if (newProps.messages.length !== newProps.unread_count) {
				const lastMessage = newProps.messages[newProps.messages.length - 1];
				socket.send(
					JSON.stringify({
						content: lastMessage.id,
						type: "get old",
					})
				);
			}
		}

		if (
			(newProps.messages && newProps.messages !== oldProps.messages) ||
			(newProps.newMessage && newProps.newMessage !== oldProps.newMessage)
		) {
			const { messages, newMessage } = newProps;
			const { ChatMessageGroup } = this.children;

			const allMessages = [...messages];

			if (newMessage) allMessages.push(newMessage);

			const checkMessageState = (message) => {
				const { user } = window.store.getState();

				return message.user_id === user.id ? "upcoming" : "incoming";
			};

			const formatMessage = (message) => ({
				...message,
				state: checkMessageState(message),
				time: getTime(message.time),
			});

			const groupMessagesByDay = (msgs) => {
				if (!msgs) return [];

				const result: any = [];
				let current;

				const sortedMessages = msgs.sort(
					(item_1, item_2) => new Date(item_1.time) - new Date(item_2.time)
				);

				sortedMessages.forEach((message) => {
					const date = new Date(message.time);
					const index = result.findIndex(
						(item) => item.date.getDate() === date.getDate()
					);

					if (index !== -1) {
						result[index].messages.push(formatMessage(message));
					} else {
						current = {
							date: date,
							messages: [formatMessage(message)],
						};

						result.push(current);
					}
				});

				return result.map((item) => ({ ...item, date: formatDate(item.date) }));
			};

			const messagesGrouped = groupMessagesByDay(allMessages);

			ChatMessageGroup.setProps({ groups: messagesGrouped });

			return true;
		}

		return false;
	}

	public render(): string {
		return `
				<div class='chat-dialog-top'>
					<div class='chat-dialog-top__user'>
						{{{ Avatar }}}
						<div class='chat-dialog-top__user-name'>{{title}}</div>
					</div>
					<div class="chat-dialog-top__actions">
						<div class='chat-dialog-top__actions-button'>
							{{{ ChatWidgetButton }}}
						</div>
						{{#if showChatWidget}}
							<div class="chat-dialog-top__actions-widget">
								{{{ ChatWidget }}}
							</div>
						{{/if}}
					</div>
				</div>
				<div class='chat-dialog-body' id="scroll-content">
					{{#if isChatTokenLoading}}
						{{{ Loader }}}
					{{ else if chatTokenError}}
						<p class="error">{{ chatTokenError }}</p>
					{{else if messages}}
						{{{ ChatMessageGroup }}}
					{{/if}}
				</div>
				<div class="chat-dialog-bottom">
					<div class="chat-dialog-bottom__field">
						{{{ SendMessageInput }}}
					</div>
					<div class="chat-dialog-bottom__send-button">
						{{{ SendMessageButton }}}
					</div>
				</div>
    `;
	}
}

const ChatPage = connect(
	({
		messages,
		newMessage,
		isChatTokenLoading,
		chatTokenError,
		unread_count,
	}) => ({
		messages,
		newMessage,
		isChatTokenLoading,
		chatTokenError,
		unread_count,
	})
)(ChatDialog);

export default ChatPage;
