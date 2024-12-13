import Block from "@/core/block";
import { ChatMessageGroupItem } from "@/components";
import type { IChatMessageGroupItem } from "@/components/chat/chat-message-group-item/chat-message-group-item";
import isEqual from "@/utils/isEqual";

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
				groupsList: newProps.groups.map((group) => {
					console.log(group);
					return new ChatMessageGroupItem({ ...group });
				}),
			});
			return true;
		}

		return false;
	}

	public render(): string {
		console.log("chatdialog", this.props.groups);

		return `
    {{#each groupsList}}
			{{{ this }}}
		{{/each}}
    `;
	}
}
