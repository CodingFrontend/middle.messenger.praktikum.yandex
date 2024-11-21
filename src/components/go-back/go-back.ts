import Block from '@/src/core/block';
import { IconButton } from '@/src/components';

type ProfileLayoutProps = {
  title: string;
  labelOk: string;
  labelCancel: string;
};

export default class ProfileLayout extends Block {
  constructor(props: ProfileLayoutProps) {
    super('div', {
      ...props,
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
