import { ROUTES } from "@/constants";
import ProfileApi from "@/api/profile";

const profileApi = new ProfileApi();

export const updateInfo = async (data) => {
	window.store.set({ isLoading: true });

	try {
		const user = await profileApi.updateInfo(data);
		window.store.set({ user });
		window.router.go(ROUTES.profile);
	} catch (error) {
		window.store.set({ updateInfoError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updateAvatar = async (file: File) => {
	window.store.set({ isLoading: true });
	try {
		const data = new FormData();
		data.append("avatar", file);

		const user = await profileApi.updateAvatar(data);
		window.store.set({ user });
	} catch (error) {
		window.store.set({ updateAvatarError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updatePassword = async (data) => {
	window.store.set({ isLoading: true });
	try {
		await profileApi.updatePassword(data);
		window.router.go(ROUTES.profile);
	} catch (error) {
		console.log("error", error);
		window.store.set({ updatePasswordError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
