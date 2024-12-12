import HTTPTransport from "@/core/httpTransport.ts";
import {
	APIError,
	ChatListRequestData,
	ChatListResponse,
	CreateChatRequestData,
	CreateChatResponse,
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

	async createChat(
		data: CreateChatRequestData
	): Promise<CreateChatResponse | APIError> {
		return chatApi.post<CreateChatResponse | APIError>("/", { data });
	}

	async deleteChat(
		data: DeleteChatRequest
	): Promise<DeleteChatResponse | APIError> {
		return chatApi.delete<DeleteChatResponse | APIError>("/", { data });
	}
}
