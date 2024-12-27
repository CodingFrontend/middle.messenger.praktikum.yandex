import Block, { TProps } from "./block";
import { expect } from "chai";
import Router from "./Router";
import sinon from "sinon";

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
		const back = sinon.spy(router, "back");

		router.back();

		expect(back.calledOnce).to.be.true;
	});

	it("Должен осуществлять переход вперед", () => {
		const forward = sinon.spy(router, "forward");

		router.forward();

		expect(forward.calledOnce).to.be.true;
	});
});
