import React, { useEffect, useState } from 'react';
import { userCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';
import UserFilter from '../components/User/UserFilter';
import UserList from '../components/User/UserList';

const UserPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('고객');
	const [category, setCategory] = useState('고객 목록');
	const [title, setTitle] = useState(userCategory[0].list_main);
	const [desc, setDesc] = useState(userCategory[0].list_sub);
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	const getCategory = (category) => {
		setCategory(category);
	};
	// const [list, setList] = useState([]);
	const list = [
		{
			name: '김덕기',
			email: 'bbd810@naver.com',
			date: '2022-02-22',
			address: '경기도 안산시 단원구 광덕서로102, 406-7호',
			contact: '010-1234-1234',
			account: '우리은행 1002-101-2023',
		},
		{
			name: '김덕기',
			email: 'bbd810@naver.com',
			date: '2022-02-22',
			address: '경기도 안산시 단원구 광덕서로102, 406-7호',
			contact: '010-1234-1234',
			account: '우리은행 1002-101-2023',
		},
	];

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
						title={title}
						desc={desc}
						modal={modal}
						setModal={setModal}
					/>
					<UserFilter />
					<UserList list={list} />
					<Footer />
				</Contents>
			</Container>
		</div>
	);
};

export default UserPage;

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
