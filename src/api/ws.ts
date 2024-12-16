import type { WSChatOptions } from "./types";

export default class WebScoketService {
	public socket: any;
	public apiUrl;
	public count;

	constructor(options: WSChatOptions) {
		const { user_id, chat_id, token_value, count = 0 } = options;
		this.count = count;
		this.apiUrl = `wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token_value}`;
	}

	public connect(): void {
		this.socket = new WebSocket(this.apiUrl);

		this.socket.onopen = () => {
			if (this.socket.readyState !== 1) return;
			console.log("Соединение установлено");

			this.socket.send(
				JSON.stringify({
					content: String(this.count),
					type: "get old",
				})
			);
		};

		this.socket.onmessage = (event) => {
			const messages = JSON.parse(event.data);

			if (Array.isArray(messages)) {
				const messagesFiltered = messages.filter(
					(message) => message.type === "message" || messages.type === "file"
				);
				window.store.set({ messages: messagesFiltered });
			} else {
				if (messages.type === "message" || messages.type === "file") {
					window.store.set({ newMessage: messages });
				}
			}

			console.log("Получены данные", messages);
		};

		this.socket.onclose = (event) => {
			if (event.wasClean) {
				console.log("Соединение закрыто чисто");
			} else {
				console.log("Обрыв соединения");
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);

			this.socket = null;
		};

		this.socket.onerror = (event) => {
			console.log("Ошибка", event.message);
		};
	}

	public ping() {
		this.socket.send(
			JSON.stringify({
				content: "",
				type: "ping",
			})
		);
	}

	public getState() {
		return this.socket.readyState;
	}

	public getSocket() {
		return this.socket;
	}
}
