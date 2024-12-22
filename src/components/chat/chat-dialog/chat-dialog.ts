import Block, { TChildren } from "@/core/block";
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
import type { WSResponseMessage } from "@/api/types";

export interface IChatDialogProps {
	id: number;
	title: string;
	avatar: string | null;
	showChatWidget: boolean;
	newMessage: WSResponseMessage;
	unreadMessagesInChat: number;
	lastMessageId: number;
	messages: WSResponseMessage[] | [];
}

class ChatDialogBlock extends Block {
	constructor(props: IChatDialogProps) {
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
						showChatWidget: !(this.props as IChatDialogProps).showChatWidget,
					}),
			}),
			SendMessageInput: new SendMessageInput({
				name: "message",
			}),
			SendMessageButton: new IconButton({
				faIcon: "fa-solid fa-arrow-right",
				type: "primary",
				onClick: () => {
					const value = (this.children as TChildren).SendMessageInput.value();
					const error = validateField("message", value);

					if (error) return;

					const socket = window.socket;

					socket.send(
						JSON.stringify({
							content: value,
							type: "message",
						})
					);

					(this.children as TChildren).SendMessageInput.clear();
				},
			}),
		});
	}

	public async componentDidUpdate(
		oldProps: IChatDialogProps,
		newProps: IChatDialogProps
	): Promise<boolean> {
		const socket = window.socket;

		if (newProps.id && newProps.id !== oldProps.id) {
			const chatId = newProps.id;
			await chatServices.createChatWSConnection(chatId);
			chatServices.getNewMessagesCount(newProps.id);
		}

		if (newProps.newMessage && newProps.newMessage !== oldProps.newMessage) {
			window.store.set({ chatScrolled: false });

			console.log(window.store.getState().chatScroll);

			const oldMessages = window.store.getState().messages;
			window.store.set({ messages: [...oldMessages, newProps.newMessage] });
		}

		if (
			newProps.lastMessageId &&
			newProps.lastMessageId !== oldProps.lastMessageId
		) {
			socket.send(
				JSON.stringify({
					content: newProps.lastMessageId,
					type: "get old",
				})
			);
		}

		if (
			socket &&
			socket.readyState === 1 &&
			newProps.unreadMessagesInChat &&
			newProps.unreadMessagesInChat !== oldProps.unreadMessagesInChat &&
			newProps.messages
		) {
			if (newProps.messages.length !== newProps.unreadMessagesInChat) {
				const lastMessage = newProps.messages[newProps.messages.length - 1];
				socket.send(
					JSON.stringify({
						content: lastMessage?.id,
						type: "get old",
					})
				);
			}
		}

		if (newProps.messages && newProps.messages !== oldProps.messages) {
			const { messages } = newProps;
			const { ChatMessageGroup } = this.children;

			const allMessages = [...messages];

			const checkMessageState = (message: WSResponseMessage) => {
				const { user } = window.store.getState();

				return message.user_id === user.id ? "upcoming" : "incoming";
			};

			const formatMessage = (message: WSResponseMessage) => ({
				...message,
				state: checkMessageState(message),
				time: getTime(message.time),
			});

			const groupMessagesByDay = (msgs: WSResponseMessage[]) => {
				if (!msgs) return [];

				const result: any = [];
				let current;

				const sortedMessages = msgs.sort(
					(item_1: WSResponseMessage, item_2: WSResponseMessage) =>
						Number(new Date(item_1.time)) - Number(new Date(item_2.time))
				);

				type TSortedMessage = Omit<WSResponseMessage, "time">;

				sortedMessages.forEach((message) => {
					const date = new Date(message.time);
					const index = result.findIndex(
						(item: TSortedMessage & { date: Date }) =>
							item.date.getDate() === date.getDate()
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

				return result.map((item: TSortedMessage & { date: Date }) => ({
					...item,
					date: formatDate(item.date),
				}));
			};

			const messagesGrouped = groupMessagesByDay(allMessages);

			ChatMessageGroup.setProps({ groups: messagesGrouped });

			return true;
		}

		return false;
	}

	public componentDidMount() {
		setTimeout(() => {
			const scrollContent = document.querySelector(".chat-dialog-content");
			const { messages } = this.props as IChatDialogProps;

			if (messages && scrollContent) {
				const getOldMessages = (e: Event) => {
					const element = e.target as HTMLElement;
					window.store.set({ chatScrolled: true });

					if (element && element.scrollTop === 0) {
						const lastMessageId = messages[messages.length - 1].id;

						window.store.set({ lastMessageId });
					}
				};

				scrollContent?.addEventListener("scroll", getOldMessages);

				const getMessages = () => {
					const { chatScrolled } = window.store.getState();

					const isBottom =
						Math.floor(scrollContent.scrollTop + scrollContent.clientHeight) ===
						scrollContent.scrollHeight + 1;
					if (!isBottom && !chatScrolled) {
						scrollContent.scrollTop = scrollContent.scrollHeight;
					}
				};

				getMessages();
				setInterval(getMessages, 10000);
			}

			return true;
		}, 0);
	}

	public render(): string {
		this.dispatchComponentDidMount();

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
				<div class='chat-dialog-body' >
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

const ChatDialog = connect(
	({
		messages,
		newMessage,
		isChatTokenLoading,
		chatTokenError,
		unreadMessagesInChat,
		lastMessageId,
	}) => ({
		messages,
		newMessage,
		isChatTokenLoading,
		chatTokenError,
		unreadMessagesInChat,
		lastMessageId,
	})
)(ChatDialogBlock);

export default ChatDialog;
