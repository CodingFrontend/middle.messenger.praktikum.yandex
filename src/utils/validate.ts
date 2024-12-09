import {
	checkEmail,
	checkLogin,
	checkPhone,
	checkPassword,
	checkFirstAndLastNames,
	checkEmpty,
} from "./rules.ts";

export const validateField = (key: string, value: string) => {
	let error = "";

	switch (key) {
		case "email":
			error = checkEmail(value);
			break;
		case "login":
			error = checkLogin(value);
			break;
		case "phone":
			error = checkPhone(value);
			break;
		case "password":
			error = checkPassword(value);
			break;
		case "first_name":
			error = checkFirstAndLastNames(value, "Имя");
			break;
		case "second_name":
			error = checkFirstAndLastNames(value, "Фамилия");
			break;
		case "message":
			error = checkEmpty(value);
			break;
	}

	return error;
};
