import HTTPTransport from "@/core/httpTransport.ts";
import {
	APIError,
	UserRequestData,
	UserDTO,
	UserPasswordRequestData,
	SearchUserRequestData,
} from "./types";

const profileApi = new HTTPTransport("/user");

export default class ProfileApi {
	async updateInfo(data: UserRequestData): Promise<UserDTO | APIError> {
		return profileApi.put<UserDTO | APIError>("/profile", { data });
	}

	async updateAvatar(data: FormData): Promise<UserDTO | APIError> {
		return profileApi.put<UserDTO | APIError>("/profile/avatar", { data });
	}

	async updatePassword(
		data: UserPasswordRequestData
	): Promise<void | APIError> {
		return profileApi.put<void | APIError>("/profile/password", { data });
	}

	async searchByLogin(
		data: SearchUserRequestData
	): Promise<UserDTO[] | APIError> {
		return profileApi.post<UserDTO[] | APIError>("/search", { data });
	}
}
