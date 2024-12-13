import type { WSChatOptions } from "./types";
import { formatDate } from "@/utils/formatDate";

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

		const groupMessagesByDay = (msgs) => {
			if (!msgs) return [];

			const result: any = [];
			let current;

			msgs.forEach((message) => {
				const date = new Date(message.time);
				const index = result.findIndex(
					(item) => item.date.getDate() === date.getDate()
				);

				if (index !== -1) {
					result[index].messages.push(message);
				} else {
					current = {
						date: date,
						messages: [message],
					};

					result.push(current);
				}
			});
			return result.map((item) => ({ ...item, date: formatDate(item.date) }));
		};

		const groupedMessages = groupMessagesByDay(messages);

		window.store.set({ groupedMessages });
		console.log("Получены данные", groupedMessages);
	});

	socket.addEventListener("error", (event) => {
		console.log("Ошибка", event.message);
	});

	return socket;
};

export default initChatConnection;
