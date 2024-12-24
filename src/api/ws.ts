import type { WSChatOptions, WSResponseMessage } from "./types";

export default class WebScoketService {
	public socket!: WebSocket | null;
	public apiUrl;
	public count;

	constructor(options: WSChatOptions) {
		const { user_id, chat_id, token_value, count = 0 } = options;
		this.count = count;
		this.apiUrl = `wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token_value}`;
	}

	public connect(): void {
		this.socket = new WebSocket(this.apiUrl);

		this._open();

		this._message();

		this._close();

		this._error();
	}

	public ping() {
		this.socket!.send(
			JSON.stringify({
				content: "",
				type: "ping",
			})
		);
	}

	public getState() {
		return this.socket!.readyState;
	}

	public getSocket() {
		return this.socket;
	}

	private _message() {
		this.socket!.onmessage = (event: MessageEvent) => {
			try {
				const messages = JSON.parse(event.data);

				if (Array.isArray(messages)) {
					const state = window.store.getState();

					let allMessages = state.messages;

					const messagesFiltered = messages.filter(
						(message) => message.type === "message" || message.type === "file"
					);

					if (
						allMessages.some(
							(message: WSResponseMessage) =>
								messagesFiltered.findIndex((item) => item.id === message.id) !==
								-1
						)
					)
						return;

					allMessages = allMessages.concat(messagesFiltered);

					window.store.set({ messages: allMessages });
				} else {
					if (messages.type === "message" || messages.type === "file") {
						window.store.set({ newMessage: messages });
					}
				}
			} catch (e) {
				window.store.set({ messagesError: "Невалидные данные" });
			}
		};
	}

	public message() {
		this._message();
	}

	private _open() {
		this.socket!.onopen = () => {
			if (this.socket!.readyState !== 1) return;

			this.socket!.send(
				JSON.stringify({
					content: this.count.toString(),
					type: "get old",
				})
			);
		};
	}

	public open() {
		this._open();
	}

	private _close() {
		this.socket!.onclose = (event: CloseEvent) => {
			if (event.wasClean) {
				console.log("Соединение закрыто чисто");
			} else {
				console.log("Обрыв соединения");
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);

			this.socket = null;
		};
	}

	public close() {
		this._close();
	}

	private _error() {
		this.socket!.onerror = (event: Event) => {
			console.log("Ошибка", (event as ErrorEvent).message);
		};
	}

	public error() {
		this._error();
	}
}
