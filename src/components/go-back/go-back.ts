import Block from '@/core/block';
import { IconButton } from '@/components';

export default class GoBack extends Block {
  constructor() {
    super('div', {
      classList: 'go-back',
      IconButton: new IconButton({
        faIcon: 'fa-solid fa-arrow-left',
        type: 'primary',
      }),
    });
  }

  public render(): string {
    return `
			<div class="go-back__button">
				{{{ IconButton }}}
			</div>
    `;
  }
}
