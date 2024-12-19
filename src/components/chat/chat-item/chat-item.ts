import Block from "@/core/block";
import { Avatar } from "@/components";
import type { ChatListResponse } from "@/api/types";

export interface ChatItemProps extends ChatListResponse {
	onClick?: (id: number) => void;
}

export default class ChatItem extends Block {
	constructor(props: ChatItemProps) {
		super("li", {
			...props,
			Avatar: new Avatar({
				image: props.avatar,
				size: "medium",
			}),
			events: {
				click: () => {
					if (props?.onClick) props.onClick(props.id);
				},
			},
		});
	}

	public render(): string {
		return `
			<div class="chat-item {{#if active}}chat-item--active{{/if}}">
				<div class='chat-item__wrapper'>
					<div class='chat-item__avatar'>
						{{{ Avatar }}}
					</div>
					<div class='chat-item__content'>
						<div class='chat-item__top'>
							<div class='chat-item__name'>{{title}}</div>
							<div class='chat-item__date'>{{date}}</div>
						</div>
						<div class='chat-item__body'>
							<div class='chat-item__message'>
								{{#if isMessageUpcoming}}
									<span class='chat-item__message-mine'>Вы: </span>
								{{/if}}
								<span class='chat-item__message-text'>{{message}}</span>
							</div>
						</div>
						{{#if unread_count}}
							<div class='chat-item__count'>
								{{unread_count}}
							</div>
						{{/if}}
					</div>
				</div>
			</div>
    `;
	}
}
