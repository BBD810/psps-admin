const pageTransform = (page) => {
	let result;
	if (page === '메인페이지') {
		result = '';
	} else if (page === '품생품사란') {
		result = 'intro';
	} else if (page === '상품 카테고리') {
		result = 'product';
	} else if (page === '상품 상세보기') {
		result = 'detail';
	} else if (page === '고객센터') {
		result = 'service';
	} else if (page === '회원가입') {
		result = 'register';
	} else if (page === '로그인') {
		result = 'login';
	}
	return result;
};

export const getLink = (page, part, subPart, product_id) => {
	let link = '/';
	if (page) {
		link += pageTransform(page);
	}
	if (product_id) {
		link += `/${product_id}`;
	} else if (part || subPart) {
		let arr = [];
		if (part) {
			arr.push(`part=${part}`);
		}
		if (subPart) {
			arr.push(`subPart=${subPart}`);
		}
		link += '/?' + arr.join('&');
	}
	return link;
};

export const getLinkKr = (page, part, subPart, product_id) => {
	let link = '';
	if (page) {
		link += page;
	}
	if (product_id) {
		link += ` / ${product_id}`;
	} else if (part || subPart) {
		if (part) {
			link += ` / ${part}`;
		}
		if (subPart) {
			link += ` / ${subPart}`;
		}
	}
	return link;
};
