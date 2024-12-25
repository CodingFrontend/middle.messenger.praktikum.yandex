import { describe } from "mocha";
import Block from "./block";
import sinon from "sinon";
import { expect } from "chai";

describe("Block", () => {
	let PageComponent;
	let ButtonComponent;

	before(() => {
		class Page extends Block {
			constructor(props) {
				super("div", props);
			}

			render() {
				return `
					<span id="test-text">{{text}}</span>
				`;
			}
		}

		PageComponent = Page;

		class Button extends Block {
			constructor(props) {
				super("button", {
					...props,
					classList: "new-button",
				});
			}
		}

		ButtonComponent = Button;
	});

	it("Должен создать компонент с состоянием из конструктора", () => {
		const text = "Hello";

		const pageComponent = new PageComponent({ text });

		const spanText =
			pageComponent.element?.querySelector("#test-text")?.innerHTML;

		expect(spanText).to.be.eq(text);
	});

	it("Компонент должен иметь реактивное поведение", () => {
		const newValue = "newValue";

		const pageComponent = new PageComponent({ text: "Hello" });

		pageComponent.setProps({ text: newValue });
		const spanText =
			pageComponent.element?.querySelector("#test-text")?.innerHTML;

		expect(spanText).to.be.eq(newValue);
	});

	it("Компонент должен установить события на элемент", () => {
		const clickHandlerStub = sinon.stub();
		const pageComponent = new PageComponent({
			events: {
				click: clickHandlerStub,
			},
		});

		const event = new MouseEvent("click");
		pageComponent.element?.dispatchEvent(event);

		expect(clickHandlerStub.calledOnce).to.be.true;
	});

	it("Компонент должен вызвать dispatchComponentDidMount метод", () => {
		const clock = sinon.useFakeTimers();
		const pageComponent = new PageComponent();

		const spyCDM = sinon.spy(pageComponent, "componentDidMount");

		const element = pageComponent.getContent();
		document.body.append(element!);
		clock.next();

		expect(spyCDM.calledOnce).to.be.true;
	});

	it("Компонент должен вызвать componentDidUpdate метод", () => {
		const newValue = "newValue";

		const pageComponent = new PageComponent({ text: "Hello" });
		const spyCDM = sinon.spy(pageComponent, "componentDidUpdate");

		pageComponent.setProps({ text: newValue });

		expect(spyCDM.calledOnce).to.be.true;
	});

	it("Компонент должен добавлять аттрибуты", () => {
		const attr = "disabled";

		const buttonComponent = new ButtonComponent();

		buttonComponent.setAttrs(attr);

		const buttonAttrs = (
			buttonComponent.element as HTMLElement
		)?.getAttributeNames();

		expect(buttonAttrs).to.include(attr);
	});

	it("Компонент должен добавлять ребенка", () => {
		const pageComponent = new PageComponent({ text: "Hello" });
		const buttonComponent = new ButtonComponent({});

		pageComponent.setChild({ buttonComponent });
		const isNewButtonExists = Object.keys(pageComponent.children).some(
			(key: string) => key === "buttonComponent"
		);

		expect(isNewButtonExists).to.be.eq(true);
	});
});
