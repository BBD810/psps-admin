import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Supplier/ListTemplate';
import ConfirmModal from '../components/Modal/Confirm';
import SelectModal from '../components/Modal/Select';

const SupplierPage = () => {
	const [menu, setMenu] = useState('공급원');
	const [category, setCategory] = useState('공급원 목록');
	const [modal, setModal] = useState({ type: '' });

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
						menu={menu}
						modal={modal}
						setModal={setModal}
					/>
					<ListTemplate modal={modal} setModal={setModal} />
					{modal.type === 'confirm' && (
						<ConfirmModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'select' && (
						<SelectModal modal={modal} setModal={setModal} />
					)}
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default SupplierPage;

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
