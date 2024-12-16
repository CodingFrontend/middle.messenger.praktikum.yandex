import Block from "@/core/block";
import { ChatMessagesItem } from "@/components";
import type { IChatMessagesItem } from "@/components/chat/chat-messages-item/chat-messages-item";

export interface IChatMessageGroupItem {
	date: string;
	messages: IChatMessagesItem[];
}

export default class ChatMessageGroupItem extends Block {
	constructor(props: IChatMessageGroupItem) {
		super("div", {
			...props,
			classList: "chat-message-group",
			messagesList: props.messages.map(
				(message) => new ChatMessagesItem({ ...message })
			),
		});
	}

	// public componentDidUpdate(
	// 	oldProps: IProps<any>,
	// 	newProps: IProps<any>
	// ): boolean {
	// 	if (newProps && newProps !== oldProps) {
	// 		const scrollContent = document.getElementById("scroll-content");
	// 		if (scrollContent?.scrollHeight)
	// 			scrollContent.scrollTop = scrollContent?.scrollHeight;
	// 		console.log(scrollContent?.scrollTop, scrollContent?.scrollHeight);

	// 		return true;
	// 	}

	// 	return false;
	// }

	public render(): string {
		// const scrollContent = document.getElementById("scroll-content");
		// if (scrollContent?.scrollHeight)
		// 	scrollContent.scrollTop = scrollContent?.scrollHeight;
		// console.log(scrollContent?.scrollTop, scrollContent?.scrollHeight);
		return `
			<div class="chat-messages__date">
				<span>{{date}}</span>
			</div>
			<ul class="chat-messages__items">
				{{#each messagesList}}
					{{{ this }}}
				{{/each}}
			</ul>
    `;
	}
}
