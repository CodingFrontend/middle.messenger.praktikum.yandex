import ChatApi from "@/api/chat";
import {
	AddUsersRequestData,
	APIError,
	ChatListRequestData,
	ChatListResponse,
	ChatTokenResponse,
	ChatUreadMessagesResponse,
	CreateChatRequestData,
	DeleteChatRequest,
} from "@/api/types";
const chatApi = new ChatApi();
import WebScoketService from "@/api/ws";
import { formatDate, getTime } from "@/utils/formatDate";

export const getChatList = async (model: ChatListRequestData) => {
	window.store.set({ isChatListLoading: true });

	try {
		const chatListItems = await chatApi.getChatList(model);

		const formatTime = (time: string): string => {
			const date = new Date(time);
			const todaysDate = new Date();
			const isToday =
				date.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);

			return isToday ? getTime(time) : `${formatDate(date)} ${getTime(time)}`;
		};

		const { user } = window.store.getState();

		const chatItems = (chatListItems as ChatListResponse[]).map((item) => ({
			...item,
			upcoming: user.login === item.last_message?.user.login,
			date: item.last_message ? formatTime(item.last_message?.time) : null,
		}));
		window.store.set({ chatListItems: chatItems });
	} catch (error) {
		window.store.set({ chatListError: (error as APIError).reason });
	} finally {
		window.store.set({ isChatListLoading: false });
	}
};

export const createChat = async (model: CreateChatRequestData) => {
	window.store.set({ isCreateChatLoading: true, createChatSuccess: false });
	try {
		await chatApi.createChat(model);
		window.store.set({ createChatSuccess: true });
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
		window.socket = socket.getSocket() as WebSocket;
	}
};

export const getNewMessagesCount = async (id: number) => {
	window.store.set({ isUnreadCountLoading: true });

	try {
		const res = await chatApi.getNewMessagesCount(id);
		const unread_count = (res as ChatUreadMessagesResponse).unread_count;
		window.store.set({ unread_count });
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
		await chatApi.deleteUsers({ users, chatId });
	} catch (error) {
		window.store.set({ DeleteUsersError: (error as APIError).reason });
	} finally {
		window.store.set({ isDeleteUsersLoading: false });
	}
};
