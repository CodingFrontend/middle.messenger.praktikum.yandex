export type APIError = {
	reason: string;
};

export type SignUpResponse = {
	id: number;
};

export type UserDTO = {
	id: number;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	phone: string;
	email: string;
};

export type CreateUser = Omit<UserDTO, "avatar" | "display_name" | "id"> & {
	password: string;
};

export type LoginRequestData = {
	login: string;
	password: string;
};

type LastMessage = {
	user: UserDTO;
	time: string;
	content: string;
};

export type ChatDTO = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	last_message: LastMessage | null;
};

export type RegisterRequestData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type UserRequestData = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type UserAvatarRequestData = {
	avatar: File;
};

export type UserPasswordRequestData = {
	oldPassword: string;
	newPassword: string;
};

export type ChatListRequestData = {
	offset: string;
	limit: string;
	title: string;
};

export type ChatListResponse = {
	id: string;
	title: string;
	avatar: string;
	unread_count: string;
	created_by: string;
	last_message: {
		user: {
			first_name: string;
			second_name: string;
			avatar: string;
			email: string;
			login: string;
			phone: string;
		};
		time: string;
		content: string;
	};
};

export type CreateChatRequestData = {
	title: string;
};

export type CreateChatResponse = {
	id: number;
};

export type DeleteChatRequest = {
	chatId: number;
};

export type DeleteChatResponse = {
	userId: number;
	result: {
		id: number;
		title: string;
		avatar: string;
		created_by: number;
	};
};

export type ChatTokenResponse = {
	token: string;
};

export type WSChatOptions = {
	user_id: number;
	chat_id: number;
	token_value: string;
	count?: string;
};

export type ChatUreadMessagesResponse = {
	unread_count: number;
};

export type AddUsersRequestData = {
	users: number[];
	chatId: number;
};
