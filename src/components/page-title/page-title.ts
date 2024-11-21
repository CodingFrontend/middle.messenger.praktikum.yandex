import Block from '@/src/core/block';

type PageTitleProps = {
  title: string;
};

export default class PageTitle extends Block {
  constructor(props: PageTitleProps) {
    super('h1', {
      ...props,
      classList: 'page-title',
    });
  }

  public render(): string {
    return `{{title}}`;
  }
}
