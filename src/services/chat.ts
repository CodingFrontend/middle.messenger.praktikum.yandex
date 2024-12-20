import ChatApi from "@/api/chat";
import {
	AddUsersRequestData,
	APIError,
	ChatListRequestData,
	ChatTokenResponse,
	ChatUreadMessagesResponse,
	CreateChatRequestData,
	DeleteChatRequest,
} from "@/api/types";
const chatApi = new ChatApi();
import WebScoketService from "@/api/ws";

export const getChatList = async (model: ChatListRequestData) => {
	window.store.set({ isChatListLoading: true });

	try {
		const chatListItems = await chatApi.getChatList(model);
		window.store.set({ chatListItems });
	} catch (error) {
		window.store.set({ chatListError: (error as APIError).reason });
	} finally {
		window.store.set({ isChatListLoading: false });
	}
};

export const createChat = async (model: CreateChatRequestData) => {
	window.store.set({ isCreateChatLoading: true });
	try {
		await chatApi.createChat(model);
	} catch (error) {
		window.store.set({ createChatError: (error as APIError).reason });
	} finally {
		window.store.set({ isCreateChatLoading: false });
	}
};

export const deleteChat = async (model: DeleteChatRequest) => {
	window.store.set({ isDeleteChatLoading: true });
	try {
		await chatApi.deleteChat(model);
	} catch (error) {
		window.store.set({ deleteChatError: (error as APIError).reason });
	} finally {
		window.store.set({ isDeleteChatLoading: false });
	}
};

export const getChatToken = async (id: number) => {
	window.store.set({ messages: [] });
	window.store.set({ isChatTokenLoading: true });

	try {
		const res = await chatApi.getChatToken(id);
		window.store.set({ chatToken: (res as ChatTokenResponse).token });
	} catch (error) {
		window.store.set({ chatTokenError: (error as APIError).reason });
	} finally {
		window.store.set({ isChatTokenLoading: false });
	}
};

export const createChatWSConnection = async (chatId: number) => {
	await getChatToken(chatId);
	const { user, chatToken } = window.store.getState();

	const options = {
		user_id: user.id,
		chat_id: chatId,
		token_value: chatToken,
	};

	let interval;

	if (user && chatId && chatToken) {
		if (window.socket && interval) {
			window.socket.close();
			clearInterval(interval);
		}

		const socket = new WebScoketService(options);
		socket.connect();
		interval = setInterval(() => {
			socket.ping();
		}, 10000);
		window.socket = socket.getSocket();
	}
};

export const getNewMessagesCount = async (id: number) => {
	window.store.set({ isUnreadCountLoading: true });

	try {
		const res = await chatApi.getNewMessagesCount(id);
		return (res as ChatUreadMessagesResponse).unread_count;
	} catch (error) {
		window.store.set({ unreadCountError: (error as APIError).reason });
	} finally {
		window.store.set({ isUnreadCountLoading: false });
	}
};

export const addUsers = async (data: AddUsersRequestData) => {
	window.store.set({ isAddUsersLoading: true });

	const { users, chatId } = data;

	try {
		await chatApi.addUsers({ users, chatId });
	} catch (error) {
		window.store.set({ AddUsersError: (error as APIError).reason });
	} finally {
		window.store.set({ isAddUsersLoading: false });
	}
};

export const deleteUsers = async (data: AddUsersRequestData) => {
	window.store.set({ isDeleteUsersLoading: true });

	const { users, chatId } = data;

	try {
		await chatApi.addUsers({ users, chatId });
	} catch (error) {
		window.store.set({ DeleteUsersError: (error as APIError).reason });
	} finally {
		window.store.set({ isDeleteUsersLoading: false });
	}
};
