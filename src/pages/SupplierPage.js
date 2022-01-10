import React, { useEffect, useState } from 'react';
import { supplierCategory } from '../data/arr';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Supplier/ListTemplate';
import ConfirmModal from '../components/Modal/ConfirmModal';
import SelectModal from '../components/Modal/SelectModal';

const SupplierPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('공급원');
	const [category, setCategory] = useState('공급원 목록');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '' });

	const modalController = (data) => {
		setModal(data);
	};

	useEffect(() => {
		for (let i = 0; i < supplierCategory.length; i++) {
			if (supplierCategory[i].item === category) {
				setInfo(supplierCategory[i]);
			}
		}
	}, []);

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
					mode={mode}
					menu={menu}
					title={title}
					desc={desc}
					modal={modal}
					modalController={modalController}
				/>
				<ListTemplate modal={modal} modalController={modalController} />
				{modal.type === 'confirm' && (
					<ConfirmModal modal={modal} modalController={modalController} />
				)}
				{modal.type === 'select' && (
					<SelectModal modal={modal} modalController={modalController} />
				)}
				<Footer />
			</Container>
		</div>
	);
};

export default SupplierPage;

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
