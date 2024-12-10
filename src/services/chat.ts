import ChatApi from "@/api/chat";

const chatApi = new ChatApi();

export const getChatList = async (model) => {
	window.store.set({ isChatListLoading: true });

	try {
		const chatList = await chatApi.getChatList(model);
		window.store.set({ chatList });
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
