import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';
import ListTemplate from '../../view/components/Banner/ListTemplate';
import CreateTemplate from '../../view/components/Banner/CreateTemplate';
import DetailTemplate from '../../view/components/Banner/DetailTemplate';
import ConfirmModal from '../../view/components/Modal/Confirm';
import SelectModal from '../../view/components/Modal/Select';
import BannerListModal from '../../view/components/Modal/BannerList';

const BannerPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('배너');
	const [category, setCategory] = useState('메인 배너');
	const [modal, setModal] = useState({});

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
						<ListTemplate
							category={category}
							mode={mode}
							modal={modal}
							setMode={setMode}
							setModal={setModal}
						/>
					)}
					{!createMode && mode === 'detail' && (
						<DetailTemplate
							category={category}
							mode={mode}
							modal={modal}
							setMode={setMode}
							setModal={setModal}
						/>
					)}
					{!createMode && mode === 'edit' && (
						<CreateTemplate
							category={category}
							mode={mode}
							modal={modal}
							setMode={setMode}
							setModal={setModal}
						/>
					)}
					{createMode && (
						<CreateTemplate
							category={category}
							getCategory={getCategory}
							modal={modal}
							setModal={setModal}
						/>
					)}
					{modal.type === 'confirm' && (
						<ConfirmModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'select' && (
						<SelectModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'list' && (
						<BannerListModal modal={modal} setModal={setModal} />
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
