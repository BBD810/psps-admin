export const transformToLink = (page) => {
	let link;
	if (page === '메인페이지') {
		link = '';
	} else if (page === '품생품사란') {
		link = 'intro';
	} else if (page === '상품 카테고리') {
		link = 'product';
	} else if (page === '상품 상세보기') {
		link = 'detail';
	} else if (page === '고객센터') {
		link = 'service';
	} else if (page === '회원가입') {
		link = 'register';
	} else if (page === '로그인') {
		link = 'login';
	}
	return link;
};
