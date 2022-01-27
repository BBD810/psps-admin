import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { productCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const ListTemplate = lazy(() => {
	return import('../components/Product/ListTemplate');
});
const CreateTemplate = lazy(() => {
	return import('../components/Product/CreateTemplate');
});
const DetailTemplate = lazy(() => {
	return import('../components/Product/DetailTemplate');
});
const EditTemplate = lazy(() => {
	return import('../components/Product/EditTemplate');
});
const ConfirmModal = lazy(() => {
	return import('../components/Modal/Confirm');
});
const SelectModal = lazy(() => {
	return import('../components/Modal/Select');
});
const OptionModal = lazy(() => {
	return import('../components/Modal/Option');
});
const DetailImgListModal = lazy(() => {
	return import('../components/Modal/DetailImgList');
});
const DetailImgCreateModal = lazy(() => {
	return import('../components/Modal/DetailImgCreate');
});

const ProductPage = () => {
	const history = useHistory();
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('상품');
	const [category, setCategory] = useState('상품 목록');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	if (history.location.state) {
		// changeMode('detail')
		// console.log('cc', history.location.state);
	}

	const modalController = (data) => {
		setModal(data);
	};

	useEffect(() => {
		let isSubscribed = true;
		for (let i = 0; i < productCategory.length; i++) {
			if (isSubscribed && productCategory[i].item === category) {
				setInfo(productCategory[i]);
			}
		}
		return () => {
			isSubscribed = false;
		};
	}, []);

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

	const createMode = category === '상품 추가';

	return (
		<div id='container'>
			<Container>
				<SideBar getMenu={getMenu} menu={menu} />
				<Contents>
					<Category
						category={category}
						getCategory={getCategory}
						mode={mode}
						menu={menu}
						title={title}
						desc={desc}
						modal={modal}
						modalController={modalController}
					/>
					{!createMode && mode === 'list' && (
						<Suspense fallback={<div>Loading...</div>}>
							<ListTemplate
								category={category}
								mode={mode}
								changeMode={changeMode}
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'detail' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailTemplate
								mode={mode}
								changeMode={changeMode}
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'edit' && (
						<Suspense fallback={<div>Loading...</div>}>
							<EditTemplate
								mode={mode}
								changeMode={changeMode}
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{createMode && (
						<Suspense fallback={<div>Loading...</div>}>
							<CreateTemplate
								category={category}
								getCategory={getCategory}
								mode={mode}
								changeMode={changeMode}
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{modal.type === 'confirm' && (
						<Suspense fallback={<div>Loading...</div>}>
							<ConfirmModal
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{modal.type === 'select' && (
						<Suspense fallback={<div>Loading...</div>}>
							<SelectModal
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{modal.type === 'option' && (
						<Suspense fallback={<div>Loading...</div>}>
							<OptionModal
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{modal.type === 'img_list' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailImgListModal
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}
					{modal.type === 'img_create' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailImgCreateModal
								modal={modal}
								modalController={modalController}
							/>
						</Suspense>
					)}

					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default withRouter(ProductPage);

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
