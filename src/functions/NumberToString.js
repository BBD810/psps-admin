export const numberToString = (number) => {
	let text;
	if (Number(number) === 1) {
		text = '첫';
	} else if (Number(number) === 2) {
		text = '두';
	} else if (Number(number) === 3) {
		text = '세';
	}
	return text;
};
