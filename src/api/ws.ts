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
			const { user } = window.store.getState();

			msgs.forEach((message) => {
				const date = new Date(message.time);
				const index = result.findIndex(
					(item) => item.date.getDate() === date.getDate()
				);

				if (index !== -1) {
					result[index].messages.push({
						...message,
						state: message.user_id === user.id ? "upcoming" : "incoming",
					});
				} else {
					current = {
						date: date,
						messages: [
							{
								...message,
								state: message.user_id === user.id ? "upcoming" : "incoming",
							},
						],
					};

					result.push(current);
				}
			});
			return result.map((item) => ({ ...item, date: formatDate(item.date) }));
		};

		const messagesGrouped = groupMessagesByDay(messages);

		window.store.set({ messages: messagesGrouped });
		console.log("Получены данные", messages);
	});

	socket.addEventListener("error", (event) => {
		console.log("Ошибка", event.message);
	});

	return socket;
};

export default initChatConnection;
