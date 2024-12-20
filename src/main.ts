import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import * as Layouts from "./layouts";

import Router from "@/core/Router";
import { Store } from "@/core/Store";
import * as authServices from "@/services/auth";
import * as chatServices from "@/services/chat";

import { ROUTES } from "@/constants";
import { BlockConsturctor } from "./core/block";
import { ChatListRequestData } from "./api/types";

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
	await chatServices.getChatList({} as ChatListRequestData);

	window.router = new Router("#app");
	window.router
		.use(ROUTES.login, Pages.LoginPage as BlockConsturctor)
		.use(ROUTES.register, Pages.RegisterPage as BlockConsturctor)
		.use(ROUTES.messenger, Pages.ChatPage as BlockConsturctor)
		.use(ROUTES.profile, Pages.ProfilePage as BlockConsturctor)
		.use(ROUTES.notFound, Pages.NotFoundPage as BlockConsturctor)
		.start();
};

initRouter();
