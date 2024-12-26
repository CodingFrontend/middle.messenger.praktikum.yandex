import sinon from "sinon";
import { expect } from "chai";
import { describe } from "mocha";

import HttpTransport from "./httpTransport";

describe("HttpTransport", function () {
	this.timeout(20000);
	let authApi;

	before(() => {
		authApi = new HttpTransport("/auth");
	});

	// it("Должен отправлять успешный Get запрос /user на получение пользователя", async () => {
	// 	const res = await authApi.get("/user");
	// 	expect(res.status).to.be.equal(200);
	// 	expect(res.body).not.to.be.empty;
	// 	expect(res.body).to.be.an("object");
	// 	expect(res.body.id).to.be.a("number");
	// });

	// it("Должен отправлять успешный Post запрос авторизацию пользователя", function (done) {
	// 	authApi = new HttpTransport("/auth");

	// 	let res;
	// 	authApi
	// 		.post("/signin", {
	// 			login: "mje",
	// 			password: "12345678AB",
	// 		})
	// 		.then((result) => {
	// 			console.log(1);
	// 			res = result;
	// 			console.log(result);

	// 			expect(res).to.equal("OK");

	// 			done();
	// 		})
	// 		.catch((err) => console.log(err));
	// }, 20000);

	// it("Должен выбрасывать ошибку при неуспешном Get запросе /user на получение пользователя", async (done) => {
	// 	try {
	// 		await authApi.get("/user");
	// 		done();
	// 	} catch (e) {
	// 		console.log(1);
	// 		const statuses = [400, 401, 500];
	// 		expect(e).to.be.instanceOf(Error);

	// 		expect(e.status).to.satisfy((value) => statuses.indexOf(value) !== -1);
	// 	}
	// });
});
