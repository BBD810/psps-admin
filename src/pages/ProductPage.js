import React, { lazy, Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
	return import('../components/Modal/ProductOption');
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
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	const getCategory = (category) => {
		const _state = history.location.state;
		setCategory(category);
		_state && _state.from ? setMode('detail') : setMode('list');
	};

	const createMode = category === '상품 추가';

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
								mode={mode}
								modal={modal}
								setMode={setMode}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'edit' && (
						<Suspense fallback={<div>Loading...</div>}>
							<EditTemplate
								mode={mode}
								setMode={setMode}
								modal={modal}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{createMode && (
						<Suspense fallback={<div>Loading...</div>}>
							<CreateTemplate
								category={category}
								getCategory={getCategory}
								mode={mode}
								modal={modal}
								setMode={setMode}
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
					{modal.type === 'option' && (
						<Suspense fallback={<div>Loading...</div>}>
							<OptionModal modal={modal} setModal={setModal} />
						</Suspense>
					)}
					{modal.type === 'img_list' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailImgListModal modal={modal} setModal={setModal} />
						</Suspense>
					)}
					{modal.type === 'img_create' && (
						<Suspense fallback={<div>Loading...</div>}>
							<DetailImgCreateModal modal={modal} setModal={setModal} />
						</Suspense>
					)}
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default ProductPage;

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
