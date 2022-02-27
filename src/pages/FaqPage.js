import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import styled from 'styled-components';

const FaqPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('FAQ');
	const [category, setCategory] = useState('상품관련');
	const [desc, setDesc] = useState('');

	const getCategory = (category) => {
		setCategory(category);
	};

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
