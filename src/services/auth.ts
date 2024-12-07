import { ROUTES } from "@/constants";
import AuthApi from "@/api/auth";

const authApi = new AuthApi();

export const login = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		window.router.go(ROUTES.chat);
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
		window.router.go(ROUTES.chat);
		window.store.set({ user });
	} catch (error) {
		window.store.set({ loginError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
