import Block from "@/core/block";

export interface IChatMessagesItem {
	// type: "upcoming" | "incoming";
	type: "message";
	state: "upcoming" | "incoming";
	content: string;
	is_read?: boolean;
	time: string;
}

export default class ChatMessagesItem extends Block {
	constructor(props: IChatMessagesItem) {
		super("li", {
			...props,
			classList: `chat-messages-item chat-messages-item--${props.state}`,
		});
	}

	public render(): string {
		return `
				{{#ifCond type 'message'}}
					<div class='chat-messages-item-text'>
						<div class='chat-messages-item-text__value'>{{content}}</div>
						<div class='chat-messages-item-text__info'>
							{{#if ${this.props.is_read && this.props.state !== "incoming"}}}
								<span class='chat-messages-item-text__status'>
									<i class='fa-solid fa-check-double'></i>
								</span>
							{{/if}}
							<div class='chat-messages-item-text__date'>{{time}}</div>
						</div>
					</div>
				{{/ifCond}}
    `;
	}
}
