import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';
import ListTemplate from '../../view/components/Product/ListTemplate';
import CreateTemplate from '../../view/components/Product/CreateTemplate';
import DetailTemplate from '../../view/components/Product/DetailTemplate';
import EditTemplate from '../../view/components/Product/EditTemplate';
import ConfirmModal from '../../view/components/Modal/Confirm';
import SelectModal from '../../view/components/Modal/Select';
import ProductOptionModal from '../../view/components/Modal/ProductOption';
import DetailImgListModal from '../../view/components/Modal/DetailImgList';
import DetailImgCreateModal from '../../view/components/Modal/DetailImgCreate';

const ProductPage = () => {
	const location = useLocation();
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('상품');
	const [category, setCategory] = useState('상품 목록');
	const [modal, setModal] = useState({});

	const getCategory = (category) => {
		const data = location.state;
		setCategory(category);
		data && data.from ? setMode('detail') : setMode('list');
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
							mode={mode}
							modal={modal}
							setMode={setMode}
							setModal={setModal}
						/>
					)}
					{!createMode && mode === 'edit' && (
						<EditTemplate
							mode={mode}
							setMode={setMode}
							modal={modal}
							setModal={setModal}
						/>
					)}
					{createMode && (
						<CreateTemplate
							category={category}
							getCategory={getCategory}
							mode={mode}
							modal={modal}
							setMode={setMode}
							setModal={setModal}
						/>
					)}
					{modal.type === 'confirm' && (
						<ConfirmModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'select' && (
						<SelectModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'option' && (
						<ProductOptionModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'img_list' && (
						<DetailImgListModal modal={modal} setModal={setModal} />
					)}
					{modal.type === 'img_create' && (
						<DetailImgCreateModal modal={modal} setModal={setModal} />
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
