import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const BannerPage = () => {
	const [menu, setMenu] = useState('배너');
	const [category, setCategory] = useState('메인 배너');
	const getMenu = (menu) => {
		setMenu(menu);
	};
	const getCategory = (category) => {
		setCategory(category);
	};

	return (
		<div id='container'>
			<Container>
				<SideBar getMenu={getMenu} menu={menu} />
				<Category
					getCategory={getCategory}
					category={category}
					menu={menu}
				/>

				<Footer />
			</Container>
		</div>
	);
};

export default BannerPage;

const Container = styled.div`
	width: 160rem;
	height: 100rem;
	padding-left: 24.8rem;
	padding-right: 8.09rem;
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #fff;
	box-shadow: 2px 6px 30px #00000033;
	border-radius: 4px;
	border: 2px solid blue;
`;
