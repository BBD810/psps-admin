import React, { lazy, Suspense, useEffect, useState } from 'react';
import { productImgCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const ListTemplate = lazy(() => {
	return import('../components/ProductImg/ListTemplate');
});
const CreateTemplate = lazy(() => {
	return import('../components/ProductImg/CreateTemplate');
});
const DetailTemplate = lazy(() => {
	return import('../components/ProductImg/DetailTemplate');
});
const ConfirmModal = lazy(() => {
	return import('../components/Modal/Confirm');
});
const SelectModal = lazy(() => {
	return import('../components/Modal/Select');
});
const ReplaceModal = lazy(() => {
	return import('../components/Modal/DetailImgReplace');
});

const ProductImgPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('상품 이미지');
	const [category, setCategory] = useState('이미지 목록');
	const [info, setInfo] = useState({});
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	useEffect(() => {
		for (let i = 0; i < productImgCategory.length; i++) {
			if (productImgCategory[i].item === category) {
				return setInfo(productImgCategory[i]);
			}
		}
	}, [mode]);

	useEffect(() => {
		if (mode === 'list') {
			setDesc({ ...desc, main: info.list_main, sub: info.list_sub });
		} else if (mode === 'detail') {
			setDesc({ ...desc, main: info.detail_main, sub: info.detail_sub });
		} else if (mode === 'edit') {
			setDesc({ ...desc, main: info.edit_main, sub: info.edit_sub });
		}
	}, [info, mode]);

	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};
	const createMode = category === '이미지 추가';

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
						desc={desc}
					/>
					{!createMode && mode === 'list' && (
						<Suspense fallback={<div>Loading...</div>}>
							<ListTemplate
								category={category}
								mode={mode}
								modal={modal}
								setMode={setMode}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'detail' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailTemplate
								category={category}
								mode={mode}
								desc={desc}
								modal={modal}
								setMenu={setMenu}
								setMode={setMode}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'edit' && (
						<Suspense fallback={<div>Loading...</div>}>
							<CreateTemplate
								category={category}
								desc={desc}
								mode={mode}
								modal={modal}
								setMode={setMode}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{createMode && (
						<Suspense fallback={<div>Loading...</div>}>
							<CreateTemplate
								category={category}
								getCategory={getCategory}
								desc={desc}
								modal={modal}
								setModal={setModal}
							/>
						</Suspense>
					)}
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
					{modal.type === 'list' && (
						<Suspense fallback={<div>Loading...</div>}>
							<ReplaceModal modal={modal} setModal={setModal} />
						</Suspense>
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
