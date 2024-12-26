import Block from "./block";
import { expect } from "chai";
import Router from "./Router";

describe("Router", () => {
	let router;
	let PageComponent;

	before(() => {
		class Page extends Block {
			constructor(props) {
				super("div", props);
			}

			render() {
				return `
					<span id="test-text">Test</span>
				`;
			}
		}

		PageComponent = Page;

		router = new Router("#app");
	});

	it("Должен отрисовывать содержимое страницу с роутом '/'", async () => {
		const pageRoute = "/";
		router.use(pageRoute, PageComponent).start();
		const pageComponentText =
			window.document.querySelector("#test-text")?.innerHTML;
		expect(pageComponentText).to.be.eq("Test");
	});

	it("Должен осуществлять переход по роуту", () => {
		router.go("/register");

		expect(router.history.length).to.eq(3);
	});

	it("Должен осуществлять переход назад", () => {
		router.back();

		expect(router.history.length).to.eq(3);
	});

	it("Должен осуществлять переход вперед", () => {
		router.forward();

		expect(router.history.length).to.eq(3);
	});
});
