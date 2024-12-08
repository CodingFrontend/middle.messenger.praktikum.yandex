import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import * as Layouts from "./layouts";

import { render } from "@/core/renderDom";
import Router from "@/core/Router";
import { Store, StoreEvents } from "@/core/Store";
import * as authServices from "@/services/auth";

import { ROUTES } from "@/constants";

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

const pages = {
	login: [Pages.LoginPage],
	register: [Pages.RegisterPage],
	nav: [Pages.NavigationPage],
	chat: [
		Pages.ChatPage,
		{
			chatWidgetItems: [
				{ faIcon: "fa-regular fa-square-plus", text: "Добавить пользователя" },
				{ faIcon: "fa-regular fa-square-minus", text: "Удалить пользователя" },
			],
			chatItems: [
				{
					name: "Киноклуб",
					date: "12:00",
					message:
						"Друзья, у меня для вас особенный выпуск новостей! В общем говоря,",
					count: 4,
					image: "",
				},
				{
					name: "Вадим",
					date: "12:00",
					message: "Круто",
					isMessageUpcoming: true,
					image: "",
				},
			],
			isChatSelected: true,
			userName: "Вадим",
			messages: [
				{
					date: "19 июня",
					messages: [
						{
							type: "incoming",
							content: "text",
							date: "11:56",
							value:
								"Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
						},
						{
							type: "incoming",
							content: "text",
							date: "11:56",
							value:
								"Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
						},
						{
							type: "upcoming",
							content: "text",
							value: "Круто!",
							date: "12:00",
							read: true,
						},
					],
				},
			],
			// showModal: true,
			modalTitle: "Добавить пользователя",
			modalButtonLabelOk: "Добавить",
		},
	],
	profile: [
		Pages.ProfilePage,
		{
			isGeneralInfo: true,
			isEditInfo: false,
			isEditPassword: false,
			email: "email@yandex.ru",
			login: "admin",
			first_name: "Вадим",
			last_name: "Иванов",
			display_name: "Вадим",
			phone: "+7 (909) 967 30 30",
			// showModal: true,
			fileUploaded: false,
			emptyError: "",
			fileName: "",
			uploadError: true,
			password: "admin",
		},
	],
	serverError: [Pages.ServerErrorPage],
	notFound: [Pages.NotFoundPage],
};

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

window.store = new Store({
	isLoading: false,
	user: null,
	loginError: null,
});

store.on(StoreEvents.Updated, (prevState, newState) => {
	console.log("prevState", prevState);
	console.log("newState", newState);
});

(async () => {
	await authServices.checkLoginUser();

	window.router = new Router("#app");
	window.router
		.use(ROUTES.login, Pages.LoginPage)
		.use(ROUTES.register, Pages.RegisterPage)
		.use(ROUTES.chat, Pages.ChatPage)
		.use(ROUTES.profile, Pages.ProfilePage)
		.use("*", Pages.NavigationPage)
		.start();
})();
