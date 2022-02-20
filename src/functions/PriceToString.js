export const priceToString = (price) => {
	if (typeof price === 'number') {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
};
