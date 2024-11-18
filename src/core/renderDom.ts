import Block from './block';

export function render(query: string, block: Block) {
  const root: HTMLElement = document.querySelector(query);
  root!.innerHTML = '';

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
