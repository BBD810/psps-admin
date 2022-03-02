export const faqTypeTransform = (type) => {
	let text;
	type = Number(type);
	if (type === 1) {
		text = '상품관련';
	} else if (type === 2) {
		text = '주문/결제';
	} else if (type === 3) {
		text = '배송';
	} else if (type === 4) {
		text = '취소/교환/반품';
	} else if (type === 5) {
		text = '회원정보';
	} else if (type === 6) {
		text = '서비스이용';
	}
	return text;
};

export const faqTypeTransform2 = (type) => {
	let number;
	if (type === '상품') {
		number = 1;
	} else if (type === '주문/결제') {
		number = 2;
	} else if (type === '배송') {
		number = 3;
	} else if (type === '배송') {
		number = 4;
	} else if (type === '회원정보') {
		number = 5;
	} else if (type === '서비스이용') {
		number = 6;
	}
	return number;
};
