import React, { useEffect, useState } from 'react';
import { productCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const ProductPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('상품');
	const [category, setCategory] = useState('상품 목록');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	const modalController = (data) => {
		setModal(data);
	};

	useEffect(() => {
		for (let i = 0; i < productCategory.length; i++) {
			if (productCategory[i].item === category) {
				setInfo(productCategory[i]);
			}
		}
	}, []);

	const getMenu = (menu) => {
		setMenu(menu);
	};
	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};

	return (
		<div id='container'>
			<Container>
				<SideBar getMenu={getMenu} menu={menu} />
				<Contents>
					<Category
						getCategory={getCategory}
						category={category}
						mode={mode}
						menu={menu}
						title={title}
						desc={desc}
						modal={modal}
						modalController={modalController}
					/>
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default ProductPage;

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
