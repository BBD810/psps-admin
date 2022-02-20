export const addrTransform = (text) => {
	if (typeof text === 'string') {
		return text.replace('/', ' ');
	}
};

export const productTransform = (text) => {
	if (typeof text === 'string') {
		return text.replace('|', ' / ');
	}
};
