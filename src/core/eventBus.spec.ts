import { describe } from "mocha";
import EventBus from "./eventBus";
import { expect } from "chai";
import sinon from "sinon";

describe("EventBus", () => {
	const eventBus = new EventBus();

	it("Должен добавлять события", () => {
		const clickHandlerStub = sinon.stub();

		eventBus.on("clicked", clickHandlerStub);

		expect(eventBus.listeners["clicked"]).to.include(clickHandlerStub);
	});

	it("Должен удалять события", () => {
		const clickHandlerStub = sinon.stub();

		eventBus.on("clicked", clickHandlerStub);
		eventBus.off("clicked", clickHandlerStub);

		expect(eventBus.listeners["clicked"]).to.not.include(clickHandlerStub);
	});

	it("Должен вызывать события", () => {
		const clickHandlerStub = sinon.stub();

		eventBus.on("clicked", clickHandlerStub);
		eventBus.emit("clicked");

		expect(eventBus.listeners["clicked"]).to.include(clickHandlerStub);
	});
});
