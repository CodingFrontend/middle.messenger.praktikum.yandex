import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { describe } from "mocha";

import HttpTransport from "./httpTransport";
import { baseUrl } from "../constants";

describe("HttpTransport", function () {
	const api = new HttpTransport("/test");
	let httpRequest: SinonStub;
	const testUrl = "";
	const testOptions = { data: { id: "id" } };

	beforeEach(() => {
		httpRequest = sinon.stub(api, "request");
	});

	afterEach(() => {
		sinon.restore();
	});

	it("Должен возвращать ошибку при отсутствии метода", async () => {
		const errorMessage = "Данный метод отсутствует";
		const requestStub = httpRequest.rejects(new Error(errorMessage));

		try {
			// @ts-ignore
			await api.request(`${baseUrl}/test`, { method: "SOMEMETHOD" });
			expect(requestStub.calledOnce).to.be.true;
		} catch (error) {
			const err = error as Error;
			expect(err.message).to.equal(errorMessage);
		}
	});

	it("Должен успешно отправлять GET-запрос с переданными параметрами { data: { id: 'id' } }", async () => {
		const requestStub = httpRequest.resolves();
		await api.get(testUrl, testOptions);

		expect(requestStub.calledOnce).to.be.true;
		expect(requestStub.firstCall.args[0]).to.equal(`${baseUrl}/test`);
		expect(requestStub.firstCall.args[1].method).to.equal("GET");
		expect(requestStub.firstCall.args[1].data.id).to.equal("id");
	});

	it("Должен успешно отправлять POST-запрос с переданными параметрами { data: { id: 'id' } }", async () => {
		const requestStub = httpRequest.resolves();
		await api.post(testUrl, testOptions);

		expect(requestStub.calledOnce).to.be.true;
		expect(requestStub.firstCall.args[0]).to.equal(`${baseUrl}/test`);
		expect(requestStub.firstCall.args[1].method).to.equal("POST");
		expect(requestStub.firstCall.args[1].data.id).to.equal("id");
	});

	it("Должен успешно отправлять PUT-запрос с переданными параметрами { data: { id: 'id' } }", async () => {
		const requestStub = httpRequest.resolves();
		await api.put(testUrl, testOptions);

		expect(requestStub.calledOnce).to.be.true;
		expect(requestStub.firstCall.args[0]).to.equal(`${baseUrl}/test`);
		expect(requestStub.firstCall.args[1].method).to.equal("PUT");
		expect(requestStub.firstCall.args[1].data.id).to.equal("id");
	});

	it("Должен успешно отправлять DELETE-запрос с переданными параметрами { data: { id: 'id' } }", async () => {
		const requestStub = httpRequest.resolves();
		await api.delete(testUrl, testOptions);

		expect(requestStub.calledOnce).to.be.true;
		expect(requestStub.firstCall.args[0]).to.equal(`${baseUrl}/test`);
		expect(requestStub.firstCall.args[1].method).to.equal("DELETE");
		expect(requestStub.firstCall.args[1].data.id).to.equal("id");
	});
});
