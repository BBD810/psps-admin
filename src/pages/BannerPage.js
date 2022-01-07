import React, { useEffect, useState } from 'react';
import { bannerCategory } from '../data/arr';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Contents/ListTemplate';
import CreateTemplate from '../components/Contents/CreateTemplate';
import DetailTemplate from '../components/Contents/DetailTemplate';
import EditTemplate from '../components/Contents/EditTemplate';
import ConfirmModal from '../components/Modal/ConfirmModal';
import SelectModal from '../components/Modal/SelectModal';
import ListModal from '../components/Modal/ListModal';

const BannerPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('배너');
	const [category, setCategory] = useState('메인 배너');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', text: '', return: '' });

	const modalController = (data) => {
		setModal(data);
	};

	useEffect(() => {
		for (let i = 0; i < bannerCategory.length; i++) {
			if (bannerCategory[i].item === category) {
				setInfo(bannerCategory[i]);
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
			setDesc(info.edit_title);
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
	const createMode = category !== '메인 배너' && category !== '광고 배너';

	return (
		<div id='container'>
			<Container id='hello'>
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
				{!createMode && mode === 'list' && (
					<ListTemplate category={category} changeMode={changeMode} />
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
						modal={modal}
						modalController={modalController}
					/>
				)}
				{modal.type === 'confirm' && (
					<ConfirmModal modal={modal} modalController={modalController} />
				)}
				{modal.type === 'select' && (
					<SelectModal modal={modal} modalController={modalController} />
				)}
				{modal.type === 'list' && (
					<ListModal modal={modal} modalController={modalController} />
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
