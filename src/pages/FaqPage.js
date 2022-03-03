import React, { useEffect, useState } from 'react';
import { faqTypeTransform2 } from '../functions/FaqTypeTransform';
import * as _faq from '../controller/faq';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
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

	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		_faq.get_list(faqTypeTransform2(category)).then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.question_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, [category]);

	console.log('aa');

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
				<ListTemplate list={list} setList={setList} />
				<Footer />
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
