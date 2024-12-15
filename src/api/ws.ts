import type { WSChatOptions } from "./types";

const initChatConnection = (options: WSChatOptions, data?: string) => {
	if (!options) return;

	const { user_id, chat_id, token_value, count = 0 } = options;
	const apiUrl = `wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token_value}`;

	const socket = new WebSocket(apiUrl);

	socket.addEventListener("open", () => {
		console.log("Соединение установлено");

		socket.send(
			JSON.stringify({
				content: String(count),
				type: "get old",
			})
		);
	});

	socket.addEventListener("close", (event) => {
		if (event.wasClean) {
			console.log("Соединение закрыто чисто");
		} else {
			console.log("Обрыв соединения");
		}

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	});

	socket.addEventListener("message", (event) => {
		const messages = JSON.parse(event.data);

		if (Array.isArray(messages)) {
			window.store.set({ messages });
		} else {
			window.store.set({ newMessage: messages });
		}

		console.log("Получены данные", messages);
	});

	socket.addEventListener("error", (event) => {
		console.log("Ошибка", event.message);
	});

	return socket;
};

export default initChatConnection;
