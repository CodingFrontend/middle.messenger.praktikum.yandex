import Block from '@/core/block';
import { LinkButton } from '@/components';

export default class RegisterPage extends Block {
  constructor() {
    super('main', {
      classList: 'page not-found',
      LinkButton: new LinkButton({
        label: 'Назад к чатам',
        type: 'primary',
      }),
    });
  }

  public render(): string {
    return `
			<h1 class="not-found__number">400</h1>
			<p class="not-found__text">Не туда попали</p>
			{{{ LinkButton }}}
    `;
  }
}
