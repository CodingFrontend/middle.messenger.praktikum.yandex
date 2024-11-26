import Block from '@/core/block';
import { ChatMessageGroupItem } from '@/components';
import type { IChatMessageGroupItem } from '@/components/chat/chat-message-group-item/chat-message-group-item';

export interface IChatMessageGroup {
  id: string;
  date: string;
  groups: IChatMessageGroupItem[];
}

export default class ChatMessageGroup extends Block {
  constructor(props: IChatMessageGroup) {
    super('div', {
      ...props,
      classList: 'chat-message-group',
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
