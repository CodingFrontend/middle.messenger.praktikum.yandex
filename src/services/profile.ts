import { ROUTES } from "@/constants";
import ProfileApi from "@/api/profile";

const profileApi = new ProfileApi();

export const updateInfo = async (model) => {
	window.store.set({ isLoading: true });

	try {
		const user = await profileApi.updateInfo(model);
		window.store.set({ user });
		window.router.go(ROUTES.profile);
	} catch (error) {
		window.store.set({ updateInfoError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updateAvatar = async (model) => {
	window.store.set({ isLoading: true });
	try {
		const user = await profileApi.updateAvatar(model);
		window.store.set({ user });
		window.router.go(ROUTES.profile);
	} catch (error) {
		window.store.set({ updateAvatarError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updatePassword = async (model) => {
	window.store.set({ isLoading: true });
	try {
		await profileApi.updatePassword(model);
		window.router.go(ROUTES.profile);
	} catch (error) {
		console.log("error", error);
		window.store.set({ updatePasswordError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
