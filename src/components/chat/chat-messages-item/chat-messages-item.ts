import Block from "@/core/block";

export interface IChatMessagesItem {
	// type: "upcoming" | "incoming";
	type: "message";
	content: string;
	read?: boolean;
	date: string;
}

export default class ChatMessagesItem extends Block {
	constructor(props: IChatMessagesItem) {
		super("li", {
			...props,
			classList: `chat-messages-item chat-messages-item--${props.type}`,
		});
	}
	public render(): string {
		return `
				{{#ifCond type 'message'}}
					<div class='chat-messages-item-text'>
						<div class='chat-messages-item-text__value'>{{content}}</div>
						<div class='chat-messages-item-text__info'>
							{{#if read}}
								<span class='chat-messages-item-text__status'>
									<i class='fa-solid fa-check-double'></i>
								</span>
							{{/if}}
							<div class='chat-messages-item-text__date'>{{date}}</div>
						</div>
					</div>
				{{/ifCond}}
    `;
	}
}
