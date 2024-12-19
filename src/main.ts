import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import * as Layouts from "./layouts";

import Router from "@/core/Router";
import { Store } from "@/core/Store";
import * as authServices from "@/services/auth";
import * as chatServices from "@/services/chat";

import { ROUTES } from "@/constants";

declare global {
	interface Window {
		store: Store;
		router: Router;
		socket: WebSocket;
	}
}

Object.entries(Layouts).forEach(([name, template]) => {
	if (typeof template === "function") {
		return;
	}

	Handlebars.registerPartial(name, template);
});

Object.entries(Components).forEach(([name, template]) => {
	if (typeof template === "function") {
		return;
	}

	Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper("ifCond", function (v1, v2, options) {
	if (v1 === v2) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return options.fn(this);
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return options.inverse(this);
});

window.store = new Store({});

const initRouter = async () => {
	await authServices.checkLoginUser();
	await chatServices.getChatList({});

	window.router = new Router("#app");
	window.router
		.use(ROUTES.login, Pages.LoginPage)
		.use(ROUTES.register, Pages.RegisterPage)
		.use(ROUTES.messenger, Pages.ChatPage)
		.use(ROUTES.profile, Pages.ProfilePage)
		.use("*", Pages.NavigationPage)
		.start();
};

initRouter();
