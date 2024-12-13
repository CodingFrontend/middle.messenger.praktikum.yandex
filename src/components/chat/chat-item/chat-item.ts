import Block from "@/core/block";
import { Avatar } from "@/components";
import type { ChatDTO } from "@/api/types";
import * as chatServices from "@/services/chat";

interface ChatItemProps extends ChatDTO {
	onClick?: () => void;
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
				mousedown: () => {
					props?.onClick(props.id);
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
