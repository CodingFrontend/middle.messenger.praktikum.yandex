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
import type { IChatMessageGroup } from "@/components/chat/chat-message-group/chat-message-group";
import { connect } from "@/utils/connect";
import isEqual from "@/utils/isEqual";
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
			messageText: "",
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
				onBlur: (e: Event) => {
					const value = (e.target as HTMLInputElement).value;
					this.setProps({
						messageText: value,
					});
				},
			}),
			SendMessageButton: new IconButton({
				faIcon: "fa-solid fa-arrow-right",
				type: "primary",
				onClick: () => {
					setTimeout(() => {
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

						this.children.SendMessageInput.setProps({
							messageText: "",
						});
					}, 0);
				},
			}),
		});
	}

	public async componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): Promise<boolean> {
		if (newProps.id && newProps.id !== oldProps.id) {
			await chatServices.createChatWSConnection(newProps.id);
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
			this.setProps({
				isComponentLoading: false,
			});

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
	({ messages, newMessage, isChatTokenLoading, chatTokenError }) => ({
		messages,
		newMessage,
		isChatTokenLoading,
		chatTokenError,
	})
)(ChatDialog);

export default ChatPage;
