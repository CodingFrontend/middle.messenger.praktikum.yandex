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
			Loader: new Loader(),
			Avatar: new Avatar({
				image: props.avatar || "",
				size: "small",
			}),
			ChatWidget: new ChatWidget({
				items: chatWidgetItems,
				onCloseModal: () => this.setProps({ showChatWidget: false }),
			}),
			ChatMessageGroup: new ChatMessageGroup({ groups: props.groupedMessages }),
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
						const value = this.props.messageText as string;
						const error = validateField("message", value);

						if (error) return;

						const socket = window.socket;

						socket.send(
							JSON.stringify({
								content: value,
								type: "message",
							})
						);
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
			newProps.groupedMessages &&
			newProps.groupedMessages !== oldProps.groupedMessages
		) {
			const { groupedMessages } = newProps;
			const { ChatMessageGroup } = this.children;

			ChatMessageGroup.setProps({ groups: groupedMessages });
			return true;
		}
		// if (
		// 	newProps.groupedMessages &&
		// 	newProps.groupedMessages !== oldProps.groupedMessages
		// ) {
		// 	this.setProps({
		// 		...newProps,
		// 		ChatMessageGroup: new ChatMessageGroup({
		// 			groups: newProps.groupedMessages,
		// 		}),
		// 	});
		// 	return true;
		// }

		// if (oldProps.chatDialogData !== newProps.chatDialogData) {
		// 	const { chatDialogData } = newProps;

		// 	this.setProps({ chatDialogData });
		// 	return true;
		// }
		return false;
	}

	public render(): string {
		// const currentChatDialog = rawChatDialog.find(
		// 	(item) => item.id === activeChatId
		// );

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
				<div class='chat-dialog-body'>
					{{#if isChatTokenLoading}}
						{{{ Loader }}}
					{{ else if chatTokenError}}
						<p class="error">{{ chatTokenError }}</p>
					{{else if groupedMessages}}
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
	({ groupedMessages, isChatTokenLoading, chatTokenError }) => ({
		groupedMessages,
		isChatTokenLoading,
		chatTokenError,
	})
)(ChatDialog);

export default ChatPage;
