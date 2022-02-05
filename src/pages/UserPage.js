import React, { useEffect, useState } from 'react';
import { userCategory } from '../data/category';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import Category from '../components/Category';
import Footer from '../components/Footer';

const UserPage = () => {
	const [mode, setMode] = useState('list');
	const [menu, setMenu] = useState('유저');
	const [category, setCategory] = useState('유저 목록');
	const [info, setInfo] = useState({});
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [modal, setModal] = useState({ type: '', test: '', return: '' });

	useEffect(() => {
		for (let i = 0; i < userCategory.length; i++) {
			if (userCategory[i].item === category) {
				setInfo(userCategory[i]);
			}
		}
	}, [mode]);

	const getCategory = (category) => {
		setCategory(category);
		setMode('list');
	};

	return (
		<div id='container'>
			<Container>
				<SideBar menu={menu} setMenu={setMenu} />
				<Contents>
					<Category
						getCategory={getCategory}
						category={category}
						title={title}
						desc={desc}
						mode={mode}
						menu={menu}
						modal={modal}
						setModal={setModal}
					/>
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
