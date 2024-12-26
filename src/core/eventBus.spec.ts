import { describe } from "mocha";
import EventBus from "./eventBus";
import { expect } from "chai";
import sinon from "sinon";

describe("EventBus", () => {
	const eventBus = new EventBus();

	it("Должен добавлять события", () => {
		const clickHandlerStub = sinon.stub();

		eventBus.on("clicked", clickHandlerStub);
		eventBus.emit("clickedsd");

		expect(clickHandlerStub.calledOnce).to.be.true;
	});

	it("Должен удалять события", () => {
		const clickHandlerStub = sinon.stub();

		eventBus.on("clicked", clickHandlerStub);
		eventBus.emit("clicked");
		eventBus.off("clicked", clickHandlerStub);
		eventBus.emit("clicked");

		expect(clickHandlerStub.calledOnce).to.be.true;
	});
});
