import Block from '@/src/core/block';
import { ChatMessageGroupItem } from '@/src/components';
export interface IChatMessageGroup {
  id: string;
  date: string;
  groups: any;
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
