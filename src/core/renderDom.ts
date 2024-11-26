import Block from './block';

export function render(query: string, block: Block) {
  const root: HTMLElement | null = document.querySelector(query);
  root!.innerHTML = '';

  root && root.appendChild(block.getContent() as HTMLElement);

  block.dispatchComponentDidMount();

  return root;
}
