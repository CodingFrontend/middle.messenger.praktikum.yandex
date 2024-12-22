export const formatDate = (date: Date): string => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
};

export const getTime = (str: string): string => {
	const date = new Date(str);
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
};