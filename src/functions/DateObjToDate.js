export const dateObjToDate = (date) => {
	date = new Date(date);
	let text;
	let arr = [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
	];
	text = `${arr[0]}-${arr[1]}-${arr[2]}\n${arr[3]}:${arr[4]}`;
	return text;
};
