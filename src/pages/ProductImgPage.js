import React, { useEffect, useState } from 'react';
import { productImgCategory } from '../data/category';
import { toggleMenu } from '../data/toggle';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/ProductImgPage/ListTemplate';
import CreateTemplate from '../components/ProductImgPage/CreateTemplate';
import DetailTemplate from '../components/ProductImgPage/DetailTemplate';
import EditTemplate from '../components/ProductImgPage/EditTemplate';
import ConfirmModal from '../components/Modal/ConfirmModal';
import SelectModal from '../components/Modal/SelectModal';
import ListModal from '../components/Modal/ListModal';

const ProductImgPage = () => {
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
		for (let i = 0; i < productImgCategory.length; i++) {
			if (productImgCategory[i].item === category) {
				return setInfo(productImgCategory[i]);
			}
		}
	}, [mode]);
	useEffect(() => {
		if (mode === 'list') {
			setTitle(info.list_title);
			setDesc(info.list_desc);
		} else if (mode === 'detail') {
			setTitle(info.detail_title);
			setDesc(info.detail_desc);
		} else if (mode === 'edit') {
			setTitle(info.edit_title);
			setDesc(info.edit_desc);
		}
	}, [info]);

	const changeMode = (mode) => {
		setMode(mode);
	};
	const getMenu = (menu) => {
		setMenu(menu);
	};
	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};
	const createMode = category === '이미지 추가';

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
					/>
					{!createMode && mode === 'list' && (
						<ListTemplate
							category={category}
							changeMode={changeMode}
							mode={mode}
							modal={modal}
							modalController={modalController}
						/>
					)}
					{!createMode && mode === 'detail' && (
						<DetailTemplate
							category={category}
							changeMode={changeMode}
							mode={mode}
							title={title}
							desc={desc}
							modal={modal}
							modalController={modalController}
						/>
					)}
					{!createMode && mode === 'edit' && (
						<EditTemplate
							category={category}
							changeMode={changeMode}
							mode={mode}
							title={title}
							desc={desc}
							modal={modal}
							modalController={modalController}
						/>
					)}
					{createMode && (
						<CreateTemplate
							getCategory={getCategory}
							category={category}
							title={title}
							desc={desc}
							modal={modal}
							modalController={modalController}
						/>
					)}
					{modal.type === 'confirm' && (
						<ConfirmModal
							modal={modal}
							modalController={modalController}
						/>
					)}
					{modal.type === 'select' && (
						<SelectModal
							modal={modal}
							modalController={modalController}
						/>
					)}
					{modal.type === 'list' && (
						<ListModal modal={modal} modalController={modalController} />
					)}
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default ProductImgPage;

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
