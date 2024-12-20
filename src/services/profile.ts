import { ROUTES } from "@/constants";
import ProfileApi from "@/api/profile";
import {
	APIError,
	UserPasswordRequestData,
	UserRequestData,
} from "@/api/types";

const profileApi = new ProfileApi();

export const updateInfo = async (data: UserRequestData) => {
	window.store.set({ isLoading: true });

	try {
		const user = await profileApi.updateInfo(data);
		window.store.set({ user });
		window.router.go(ROUTES.profile);
	} catch (error) {
		window.store.set({ updateInfoError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updateAvatar = async (file: File) => {
	window.store.set({ isLoading: true, updateAvatarSuccess: false });
	try {
		const data: FormData = new FormData();
		data.append("avatar", file);

		const user = await profileApi.updateAvatar(data);
		window.store.set({
			user,
			updateAvatarSuccess: true,
		});
	} catch (error) {
		window.store.set({ updateAvatarError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updatePassword = async (data: UserPasswordRequestData) => {
	window.store.set({ isLoading: true });
	try {
		await profileApi.updatePassword(data);
		window.router.go(ROUTES.profile);
	} catch (error) {
		console.log("error", error);
		window.store.set({ updatePasswordError: (error as APIError).reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
