import React, { useEffect, useState } from 'react';
import {
	faqTypeTransform,
	faqTypeTransform2,
} from '../../utils/FaqTypeTransform';
import * as faqController from '../../controller/faq';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';
import ListTemplate from '../../view/components/Faq/ListTemplate';
import FaqInputModal from '../../view/components/Modal/FaqInput';
import SelectModal from '../../view/components/Modal/Select';

const FaqPage = () => {
	const mode = 'list';
	const [menu, setMenu] = useState('FAQ');
	const [category, setCategory] = useState('상품관련');
	const [modal, setModal] = useState({});
	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		faqController.getList(faqTypeTransform2(category)).then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.question_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, [category]);

	useEffect(() => {
		if (modal.act === 'create' && modal.return) {
			faqController.create(modal.return).then((res) => {
				const { success, qu_type_id, question_list } = res.data;
				success && faqSuccess(qu_type_id, question_list);
			});
		} else if (modal.act === 'edit' && modal.return) {
			faqController.edit(modal.qu_id, modal.return).then((res) => {
				const { success, qu_type_id, question_list } = res.data;
				success && faqSuccess(qu_type_id, question_list);
			});
		} else if (modal.act === 'delete' && modal.return) {
			faqController.remove(modal.qu_id).then((res) => {
				const { success, qu_type_id, question_list } = res.data;
				success && faqSuccess(qu_type_id, question_list);
			});
		}
		// eslint-disable-next-line
	}, [modal.type]);

	const faqSuccess = (questionTypeId, list) => {
		setModal({ type: '' });
		setCategory(faqTypeTransform(questionTypeId));
		setList(list);
	};

	return (
		<Container>
			<SideBar menu={menu} setMenu={setMenu} />
			<Contents>
				<Category
					category={category}
					getCategory={setCategory}
					mode={mode}
					menu={menu}
				/>
				<ListTemplate
					list={list}
					setList={setList}
					modal={modal}
					setModal={setModal}
				/>
				{(modal.act === 'create' || modal.act === 'edit') && (
					<FaqInputModal modal={modal} setModal={setModal} />
				)}
				{modal.type === 'select' && (
					<SelectModal modal={modal} setModal={setModal} />
				)}
				<Footer />
			</Contents>
		</Container>
	);
};

export default FaqPage;

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
