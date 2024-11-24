import Block from '@/src/core/block';
import { LinkButton } from '@/src/components';

export interface IChatWidgetItem {
  faIcon: string;
  text: string;
}

interface IChatWidgetProps {
  items: IChatWidgetItem[];
}

export default class ChatWidget extends Block {
  constructor(props: IChatWidgetProps) {
    super('ul', {
      ...props,
      classList: 'chat-widget',
      items: props.items.map(
        (props: IChatWidgetItem) =>
          new LinkButton({
            label: props.text,
            iconLeft: props.faIcon,
            onClick: (e: Event) => {
              e.preventDefault();
              console.log(props.text);
            },
          })
      ),
    });
  }
  public render(): string {
    return `
      {{#each items}}
				<li>
					{{{ this }}}
				</li>
			{{/each}}
    `;
  }
}
