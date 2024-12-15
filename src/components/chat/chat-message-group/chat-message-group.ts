import Block from "@/core/block";
import { ChatMessageGroupItem } from "@/components";
import type { IChatMessageGroupItem } from "@/components/chat/chat-message-group-item/chat-message-group-item";

export interface IChatMessageGroup {
	// date?: string;
	// messages?: any;
	groups: IChatMessageGroupItem[];
}

export default class ChatMessageGroup extends Block {
	constructor(props: IChatMessageGroup) {
		super("div", {
			...props,
			classList: "chat-dialog-content",
		});
	}

	public componentDidUpdate(
		oldProps: IProps<any>,
		newProps: IProps<any>
	): boolean {
		if (newProps.groups && newProps.groups !== oldProps.groups) {
			this.setChild({
				groupsList: newProps.groups.map(
					(group) => new ChatMessageGroupItem({ ...group })
				),
			});
			return true;
		}

		return false;
	}

	public render(): string {
		return `
    {{#each groupsList}}
			{{{ this }}}
		{{/each}}
    `;
	}
}
