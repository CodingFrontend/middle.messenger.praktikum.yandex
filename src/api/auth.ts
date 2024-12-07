import HTTPTransport from "@/core/httpTransport.ts";
import {
	APIError,
	CreateUser,
	LoginRequestData,
	SignUpResponse,
	UserDTO,
} from "./types";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
	async create(data: CreateUser): Promise<SignUpResponse> {
		return authApi.post<SignUpResponse>("/signup", { data });
	}

	async login(data: LoginRequestData): Promise<void | APIError> {
		return authApi.post<void | APIError>("/signin", { data });
	}

	async me(): Promise<UserDTO | APIError> {
		return authApi.get<UserDTO | APIError>("/user");
	}

	async logout(): Promise<void | APIError> {
		return authApi.post<void | APIError>("/logout");
	}
}
