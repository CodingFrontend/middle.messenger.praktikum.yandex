import Block from '@/core/block';
import { ChatMessageGroupItem } from '@/components';
import type { IChatMessageGroupItem } from '@/components/chat/chat-message-group-item/chat-message-group-item';

export interface IChatMessageGroup {
  groups: IChatMessageGroupItem[];
}

export default class ChatMessageGroup extends Block {
  constructor(props: IChatMessageGroup) {
    super('div', {
      ...props,
      classList: 'chat-dialog-content',
      groupsList: props.groups.map(
        (group) => new ChatMessageGroupItem({ ...group })
      ),
    });
  }
  public render(): string {
    return `
    {{#each groupsList}}
			{{{ this }}}
		{{/each}}
    `;
  }
}
