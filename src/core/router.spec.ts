import Block, { TProps } from "./block";
import { expect } from "chai";
import Router from "./Router";

describe("Router", () => {
	const router = new Router("#app");
	class PageComponent extends Block {
		constructor(props: TProps) {
			super("div", props);
		}

		render() {
			return `
				<span id="test-text">Test</span>
			`;
		}
	}

	it("Должен отрисовывать содержимое страницу с роутом '/'", async () => {
		const pageRoute = "/";
		router.use(pageRoute, PageComponent).start();
		const pageComponentText =
			window.document.querySelector("#test-text")?.innerHTML;
		expect(pageComponentText).to.be.eq("Test");
	});

	it("Должен осуществлять переход по роуту", () => {
		router.go("/register");

		expect(router.history.length).to.eq(2);
	});

	it("Должен осуществлять переход назад", () => {
		router.back();

		expect(router.history.length).to.eq(2);
	});

	it("Должен осуществлять переход вперед", () => {
		router.forward();

		expect(router.history.length).to.eq(2);
	});
});
