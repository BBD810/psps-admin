import React, { useEffect, useState } from 'react';
import { bannerCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Banner/ListTemplate';
import CreateTemplate from '../components/Banner/CreateTemplate';
import DetailTemplate from '../components/Banner/DetailTemplate';
import EditTemplate from '../components/Banner/EditTemplate';
import ConfirmModal from '../components/Modal/ConfirmModal';
import SelectModal from '../components/Modal/SelectModal';
import ListModal from '../components/Modal/ListModal';

const BannerPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('배너');
	const [category, setCategory] = useState('메인 배너');
	const [info, setInfo] = useState({});
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
	console.log('iiii', info);
	useEffect(() => {
		if (mode === 'list') {
			setDesc({ ...desc, main: info.list_main, sub: info.list_sub });
		} else if (mode === 'detail') {
			setDesc({ ...desc, main: info.detail_main, sub: info.detail_sub });
		} else if (mode === 'edit') {
			setDesc({ ...desc, main: info.edit_main, sub: info.edit_sub });
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
			<Container>
				<SideBar getMenu={getMenu} menu={menu} />
				<Contents>
					<Category
						getCategory={getCategory}
						category={category}
						mode={mode}
						menu={menu}
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
							modal={modal}
							modalController={modalController}
						/>
					)}
					{!createMode && mode === 'edit' && (
						<EditTemplate
							category={category}
							changeMode={changeMode}
							mode={mode}
							desc={desc}
							modal={modal}
							modalController={modalController}
						/>
					)}
					{createMode && (
						<CreateTemplate
							getCategory={getCategory}
							category={category}
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

export default BannerPage;

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
