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

export interface IChatDialog {
	id: string;
	name: string;
	image?: string;
	groups: IChatMessageGroup[];
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
				image: props.image || "",
				size: "small",
			}),
			ChatWidget: new ChatWidget({
				items: chatWidgetItems,
				onCloseModal: () => this.setProps({ showChatWidget: false }),
			}),
			ChatMessageGroup: new ChatMessageGroup({ groups: props.groups }),
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

						console.log(value);
					}, 0);
				},
			}),
		});
	}

	public componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): boolean {
		if (oldProps.chatDialogData !== newProps.chatDialogData) {
			const { chatDialogData } = newProps;

			this.setProps({ chatDialogData });
			return true;
		}
		return true;
	}

	public render(): string {
		return `
			{{#if chatDialogData}}
				<div class='chat-dialog-top'>
					<div class='chat-dialog-top__user'>
						{{{ Avatar }}}
						<div class='chat-dialog-top__user-name'>{{chatDialogData.title}}</div>
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
					{{#if groups}}
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
			{{ else }}
			<div class="chat-content-empty">
				<p>Выберите чат чтобы отправить сообщение</p>
			</div>
      {{/if}}
    `;
	}
}

const ChatPage = connect(({ chatDialogData }) => ({
	chatDialogData,
}))(ChatDialog);

export default ChatPage;
