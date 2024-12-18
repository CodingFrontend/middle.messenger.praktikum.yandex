import { ROUTES } from "@/constants";
import AuthApi from "@/api/auth";

const authApi = new AuthApi();

export const login = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		await checkLoginUser();
		const state = window.store.getState();

		if (state.user) {
			window.router.go(ROUTES.messenger);
		}
	} catch (error) {
		window.store.set({ loginError: error.reason });
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
		window.store.set({ loginUserError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const register = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.register(model);
		window.router.go(ROUTES.messenger);
	} catch (error) {
		console.log("error", error);
		window.store.set({ registerError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const logout = async (model) => {
	window.store.set({ isLogoutLoading: true });
	try {
		await authApi.logout(model);
		window.router.go(ROUTES.login);
	} catch (error) {
		window.store.set({ logoutError: error.reason });
	} finally {
		window.store.set({ isLogoutLoading: false });
	}
};

// export const getUser = () => {
// 	const store = window.store;
// 	const { user } = store.getState();

// 	return user;
// };
