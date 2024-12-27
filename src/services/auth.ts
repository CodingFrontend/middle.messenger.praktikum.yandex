import { ROUTES } from "@/constants";
import AuthApi from "@/api/auth";
import { APIError, CreateUser, LoginRequestData } from "@/api/types";

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		await checkLoginUser();
		const state = window.store.getState();

		if (state.user) {
			window.router.go(ROUTES.messenger);
		}
	} catch (error) {
		window.store.set({ loginError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const checkLoginUser = async () => {
	window.store.set({ isLoading: true });
	try {
		const user = await authApi.me();
		window.store.set({ user });
	} catch (error) {
		window.store.set({ loginUserError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const register = async (model: CreateUser) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.register(model);
		window.router.go(ROUTES.messenger);
	} catch (error) {
		console.log("error", error);
		window.store.set({ registerError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const logout = async () => {
	window.store.set({ isLogoutLoading: true });
	try {
		await authApi.logout();
		window.router.go(ROUTES.login);
	} catch (error) {
		window.store.set({ logoutError: (error as APIError).reason });
	} finally {
		window.store.set({ isLogoutLoading: false });
	}
};

