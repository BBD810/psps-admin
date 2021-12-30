import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Contents/ListTemplate';
import CreateTemplate from '../components/Contents/CreateTemplate';

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
				{category === '메인 배너' && (
					<ListTemplate imgHeight={{ height: '16.9rem' }} />
				)}
				{category === '광고 배너' && (
					<ListTemplate imgHeight={{ height: '11.3rem' }} />
				)}
				{category === '배너 추가' && (
					<CreateTemplate getCategory={getCategory} category={category} />
				)}
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
	align-items: center;
	position: relative;
	background-color: #fff;
	box-shadow: 2px 6px 30px #00000033;
	border-radius: 4px;
`;
