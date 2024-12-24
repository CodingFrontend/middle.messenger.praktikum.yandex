import Block from "@/core/block";

export default class Avatar extends Block {
	constructor() {
		super("div", {
			classList: "loader",
		});
	}
	public render(): string {
		return `
      <p class="loader__text">Загрузка...</p>
    `;
	}
}
