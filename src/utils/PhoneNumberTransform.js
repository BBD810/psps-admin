export const phoneNumberTransform = (number) => {
	let text = '';
	if (!number) {
		return;
	} else if (number.length === 10) {
		text = number.replace(
			/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/,
			'$1-$2-$3'
		);
	} else if (number.length === 11) {
		text = number.replace(
			/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/,
			'$1-$2-$3'
		);
	} else {
		text = number;
	}
	return text;
};
