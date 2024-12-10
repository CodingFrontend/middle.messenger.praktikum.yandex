import HTTPTransport from "@/core/httpTransport.ts";
import {
	APIError,
	ChatListRequestData,
	ChatListResponse,
	CreateChatRequestData,
	DeleteChatRequest,
	DeleteChatResponse,
} from "./types";

const chatApi = new HTTPTransport("/chats");

export default class ChatApi {
	async getChatList(
		data: ChatListRequestData
	): Promise<ChatListResponse | APIError> {
		return chatApi.get<ChatListResponse | APIError>("/", { data });
	}

	async createChat(data: CreateChatRequestData): Promise<void | APIError> {
		return chatApi.post<void | APIError>("/", { data });
	}

	async deleteChat(
		data: DeleteChatRequest
	): Promise<DeleteChatResponse | APIError> {
		return chatApi.delete<DeleteChatResponse | APIError>("/", { data });
	}
}
