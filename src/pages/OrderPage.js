import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Order from '../components/Order/Order';
import Delivery from '../components/Order/Delivery';

const OrderPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('주문');
	const [category, setCategory] = useState('주문 목록');
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	const getCategory = (category) => {
		setCategory(category);
	};

	return (
		<div id='container'>
			<Container>
				<SideBar menu={menu} setMenu={setMenu} />
				<Contents>
					<Category
						category={category}
						getCategory={getCategory}
						// mode={mode}
						menu={menu}
						// title={title}
						// desc={desc}
						modal={modal}
						setModal={setModal}
					/>
					{category === '주문 목록' && <Order />}
					{category === '배송 관리' && <Delivery />}
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default OrderPage;

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
