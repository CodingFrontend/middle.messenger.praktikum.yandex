import Block from '@/core/block';
import { Avatar } from '@/components';

export interface IChatItem {
  id: string;
  name: string;
  date: string;
  message: string;
  count?: number;
  image?: string;
  isMessageUpcoming?: boolean;
  active?: boolean;
  onClick?: (e: Event) => void;
}

export default class ChatItem extends Block {
  constructor(props: IChatItem) {
    super('li', {
      ...props,
      Avatar: new Avatar({
        image: props.image,
        size: 'medium',
      }),
      events: {
        mousedown: props.onClick,
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
							<div class='chat-item__name'>{{name}}</div>
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
						{{#if count}}
							<div class='chat-item__count'>
								{{count}}
							</div>
						{{/if}}
					</div>
				</div>
			</div>
    `;
  }
}
