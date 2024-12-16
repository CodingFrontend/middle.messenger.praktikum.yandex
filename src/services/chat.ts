import ChatApi from "@/api/chat";
const chatApi = new ChatApi();
import WebScoketService from "@/api/ws";

export const getChatList = async (model) => {
	window.store.set({ isChatListLoading: true });

	try {
		const chatListItems = await chatApi.getChatList(model);
		window.store.set({ chatListItems });
	} catch (error) {
		window.store.set({ chatListError: error.reason });
	} finally {
		window.store.set({ isChatListLoading: false });
	}
};

export const createChat = async (model) => {
	window.store.set({ isCreateChatLoading: true });
	try {
		await chatApi.createChat(model);
	} catch (error) {
		window.store.set({ createChatError: error.reason });
	} finally {
		window.store.set({ isCreateChatLoading: false });
	}
};

export const deleteChat = async (model) => {
	window.store.set({ isDeleteChatLoading: true });
	try {
		await chatApi.deleteChat(model);
	} catch (error) {
		window.store.set({ deleteChatError: error.reason });
	} finally {
		window.store.set({ isDeleteChatLoading: false });
	}
};

export const getChatToken = async (model) => {
	window.store.set({ messages: [] });
	window.store.set({ isChatTokenLoading: true });

	try {
		const { token } = await chatApi.getChatToken(model);
		window.store.set({ chatToken: token });
	} catch (error) {
		window.store.set({ chatTokenError: error.reason });
	} finally {
		window.store.set({ isChatTokenLoading: false });
	}
};

export const createChatWSConnection = async (chatId) => {
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
		const { unread_count } = await chatApi.getNewMessagesCount(id);
		return unread_count;
	} catch (error) {
		window.store.set({ unreadCountError: error.reason });
	} finally {
		window.store.set({ isUnreadCountLoading: false });
	}
};

export const addUsers = async ({ users, chatId }) => {
	window.store.set({ isAddUsersLoading: true });

	try {
		await chatApi.addUsers({ users, chatId });
	} catch (error) {
		window.store.set({ AddUsersError: error.reason });
	} finally {
		window.store.set({ isAddUsersLoading: false });
	}
};

export const deleteUsers = async ({ users, chatId }) => {
	window.store.set({ isDeleteUsersLoading: true });

	try {
		await chatApi.addUsers({ users, chatId });
	} catch (error) {
		window.store.set({ DeleteUsersError: error.reason });
	} finally {
		window.store.set({ isDeleteUsersLoading: false });
	}
};
