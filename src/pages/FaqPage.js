import React, { useEffect, useState } from 'react';
import * as _faq from '../controller/faq';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import ListTemplate from '../components/Faq/ListTemplate';
import styled from 'styled-components';

const FaqPage = () => {
	const mode = 'list';
	const [menu, setMenu] = useState('FAQ');
	const [category, setCategory] = useState('상품관련');
	const [desc, setDesc] = useState('');

	const getCategory = (category) => {
		setCategory(category);
	};

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const onePage = 10;
	const [list, setList] = useState([
		{
			type: '상품',
			question: '고기 색깔이 이상해요.',
			answer: '원래 그래요',
		},
		{
			type: '주문/결제',
			question: '고기 색깔이 이상해요.',
			answer: '원래 그래요',
		},
		{
			type: '취소/교환/환불',
			question: '고기 색깔이 이상해요.',
			answer: '원래 그래요',
		},
		{
			type: '서비스 이용',
			question: '고기 색깔이 이상해요.',
			answer: '원래 그래요',
		},
	]);

	useEffect(() => {
		let isSubscribed = true;
		// _faq.get_list().then((res) => {
		// 	console.log(res.data);
		// });
		return () => {
			isSubscribed = false;
		};
	}, []);

	return (
		<Container>
			<SideBar menu={menu} setMenu={setMenu} />
			<Contents>
				<Category
					category={category}
					getCategory={getCategory}
					mode={mode}
					menu={menu}
					desc={desc}
				/>
				<ListTemplate
					list={list}
					setList={setList}
					page={page}
					total={total}
					onePage={onePage}
					onClickPage={setPage}
				/>
			</Contents>
		</Container>
	);
};

export default FaqPage;

const Container = styled.div`
	width: 160rem;
	margin: 4.25rem 0;
	padding-right: 8.09rem;
	display: flex;
	position: relative;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 2px 6px 30px #00000033;
`;
const Contents = styled.div`
	min-height: 78.9rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
