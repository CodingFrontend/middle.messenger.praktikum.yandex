import HTTPTransport from "@/core/httpTransport.ts";
import {
	APIError,
	ChatListRequestData,
	ChatListResponse,
	CreateChatRequestData,
	CreateChatResponse,
	DeleteChatRequest,
	DeleteChatResponse,
	ChatTokenResponse,
	ChatUreadMessagesResponse,
	AddUsersRequestData,
} from "./types";

const chatApi = new HTTPTransport("/chats");

export default class ChatApi {
	async getChatList(
		data: ChatListRequestData
	): Promise<ChatListResponse | APIError> {
		return chatApi.get<ChatListResponse | APIError>("", { data });
	}

	async createChat(
		data: CreateChatRequestData
	): Promise<CreateChatResponse | APIError> {
		return chatApi.post<CreateChatResponse | APIError>("", { data });
	}

	async deleteChat(
		data: DeleteChatRequest
	): Promise<DeleteChatResponse | APIError> {
		return chatApi.delete<DeleteChatResponse | APIError>("", { data });
	}

	async getChatToken(id: number): Promise<ChatTokenResponse | APIError> {
		return chatApi.post<ChatTokenResponse | APIError>(`/token/${id}`);
	}

	async getNewMessagesCount(
		id: number
	): Promise<ChatUreadMessagesResponse | APIError> {
		return chatApi.get<ChatUreadMessagesResponse | APIError>(`/new/${id}`);
	}

	async addUsers(data: AddUsersRequestData): Promise<void | APIError> {
		return chatApi.put<void | APIError>("/users", { data });
	}

	async deleteUsers(data: AddUsersRequestData): Promise<void | APIError> {
		return chatApi.delete<void | APIError>("/users", { data });
	}
}
