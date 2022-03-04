import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
	faqTypeTransform,
	faqTypeTransform2,
} from '../functions/FaqTypeTransform';
import * as _faq from '../controller/faq';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import ListTemplate from '../components/Faq/ListTemplate';
import styled from 'styled-components';

const FaqInputModal = lazy(() => {
	return import('../components/Modal/FaqInput');
});

const FaqPage = () => {
	const mode = 'list';
	const [menu, setMenu] = useState('FAQ');
	const [category, setCategory] = useState('상품관련');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '' });

	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		_faq.get_list(faqTypeTransform2(category)).then((res) => {
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
			_faq.create(modal.return).then((res) => {
				const { success, qu_type_id, question_list } = res.data;
				success && faqSuccess(qu_type_id, question_list);
			});
		} else if (modal.act === 'edit' && modal.return) {
			_faq.edit(modal.qu_id, modal.return).then((res) => {
				const { success, qu_type_id, question_list } = res.data;
				success && faqSuccess(qu_type_id, question_list);
			});
		}
	}, [modal.type]);

	const faqSuccess = (qu_type_id, list) => {
		setModal({ type: '' });
		setCategory(faqTypeTransform(qu_type_id));
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
					desc={desc}
				/>
				<ListTemplate
					list={list}
					setList={setList}
					modal={modal}
					setModal={setModal}
				/>
				{(modal.act === 'create' || modal.act === 'edit') && (
					<Suspense fallback={<div>Loading...</div>}>
						<FaqInputModal modal={modal} setModal={setModal} />
					</Suspense>
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
`;
const Contents = styled.div`
	min-height: 78.9rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
