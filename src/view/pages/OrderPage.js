import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';
import Order from '../../view/components/Order/Order';

const OrderPage = () => {
	const mode = 'list';
	const [menu, setMenu] = useState('주문');
	const [category, setCategory] = useState('주문 목록');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	return (
		<div id='container'>
			<Container>
				<SideBar menu={menu} setMenu={setMenu} />
				<Contents>
					<Category
						category={category}
						getCategory={setCategory}
						mode={mode}
						menu={menu}
						modal={modal}
						setModal={setModal}
					/>
					{category === '주문 목록' && (
						<Order modal={modal} setModal={setModal} />
					)}
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
	@media ${(props) => props.theme.hd} {
		margin: 3rem 0;
	}
`;
const Contents = styled.div`
	min-height: 78.9rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media ${(props) => props.theme.hd} {
		min-height: 66rem;
	}
`;
