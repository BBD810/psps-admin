import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';

const ListTemplate = lazy(() => {
	return import('../../view/components/Banner/ListTemplate');
});
const CreateTemplate = lazy(() => {
	return import('../../view/components/Banner/CreateTemplate');
});
const DetailTemplate = lazy(() => {
	return import('../../view/components/Banner/DetailTemplate');
});
const ConfirmModal = lazy(() => {
	return import('../../view/components/Modal/Confirm');
});
const SelectModal = lazy(() => {
	return import('../../view/components/Modal/Select');
});
const ListModal = lazy(() => {
	return import('../../view/components/Modal/BannerList');
});

const BannerPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('배너');
	const [category, setCategory] = useState('메인 배너');
	const [modal, setModal] = useState({ type: '', text: '', return: '' });

	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};
	const createMode = category !== '메인 배너' && category !== '광고 배너';

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
								modal={modal}
								setMode={setMode}
								setModal={setModal}
							/>
						</Suspense>
					)}
					{!createMode && mode === 'edit' && (
						<Suspense fallback={<div>Loading...</div>}>
							<CreateTemplate
								category={category}
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
							<ListModal modal={modal} setModal={setModal} />
						</Suspense>
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
