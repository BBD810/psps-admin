import React, { useEffect, useState } from 'react';
import { paymentCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const PaymentPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('상품 이미지');
	const [category, setCategory] = useState('이미지 목록');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	const modalController = (data) => {
		setModal(data);
	};

	useEffect(() => {
		for (let i = 0; i < paymentCategory.length; i++) {
			if (paymentCategory[i].item === category) {
				setInfo(paymentCategory[i]);
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
			</Container>
		</div>
	);
};

export default PaymentPage;

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
