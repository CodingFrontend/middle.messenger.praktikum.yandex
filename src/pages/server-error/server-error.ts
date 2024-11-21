import Block from '@/src/core/block';
import { LinkButton } from '@/src/components';

export default class RegisterPage extends Block {
  constructor() {
    super('main', {
      classList: 'page server-error',
      LinkButton: new LinkButton({
        label: 'Назад к чатам',
        type: 'primary',
      }),
    });
  }

  public render(): string {
    return `
			<h1 class="server-error__number">500</h1>
			<p class="server-error__text">Мы уже фиксим</p>
			{{{ LinkButton }}}
    `;
  }
}
