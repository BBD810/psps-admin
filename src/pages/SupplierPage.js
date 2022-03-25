import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Supplier/ListTemplate';

const ConfirmModal = lazy(() => {
	return import('../components/Modal/Confirm');
});
const SelectModal = lazy(() => {
	return import('../components/Modal/Select');
});

const SupplierPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('공급원');
	const [category, setCategory] = useState('공급원 목록');
	const [modal, setModal] = useState({ type: '' });

	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};

	return (
		<div id='container'>
			<Container>
				<SideBar menu={menu} setMenu={setMenu} />
				<Contents>
					<Category
						category={category}
						getCategory={getCategory}
						mode={mode}
						menu={menu}
						modal={modal}
						setModal={setModal}
					/>
					<ListTemplate modal={modal} setModal={setModal} />
					{modal.type === 'confirm' && (
						<Suspense fallback={<div>Loading...</div>}>
							<ConfirmModal modal={modal} setModal={setModal} />
						</Suspense>
					)}
					{modal.type === 'select' && (
						<Suspense fallback={<div>Loading...</div>}>
							<SelectModal modal={modal} setModal={setModal} />
						</Suspense>
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
