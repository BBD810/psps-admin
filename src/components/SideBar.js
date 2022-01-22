import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { admin_logout } from '../modules/admin';
import * as request from '../controller/auth';
import styled from 'styled-components';
import logo from '../images/psps-logo.svg';

const SideBar = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [pull, setPull] = useState(false);
	const menus = [
		'배너',
		'공급원',
		'상품',
		'상품 이미지',
		'결제',
		'회원',
		'통계',
	];

	const slideController = () => {
		setPull(!pull);
	};
	const menuController = (e) => {
		const innerText = e.target.innerText;
		props.getMenu(innerText);
		if (innerText === '배너') {
			history.push('/');
		} else if (innerText === '공급원') {
			history.push('/supplier');
		} else if (innerText === '상품') {
			history.push('/product');
		} else if (innerText === '상품 이미지') {
			history.push('/product-img');
		} else if (innerText === '주문') {
			history.push('/payment');
		} else if (innerText === '회원') {
			history.push('/user');
		}
		// else if (innerText === '통계') {}
	};
	const goLogout = () => {
		request.logout().then((res) => {
			if (res.data.success) {
				dispatch(admin_logout());
				history.push('/login');
			}
		});
	};

	return (
		<SideBarContainer>
			<SlideMenu active={pull}>
				<SlideMenuItem onClick={goLogout}>로그아웃</SlideMenuItem>
				<SlideMenuItem onClick={slideController}>Admin</SlideMenuItem>
			</SlideMenu>
			<LogoImg alt='logo img' src={logo} />
			<MainMenu>
				{menus.map((el, idx) => (
					<MainMenuItem
						key={idx}
						select={props.menu === el}
						onClick={menuController}>
						{el}
					</MainMenuItem>
				))}
			</MainMenu>
		</SideBarContainer>
	);
};

export default withRouter(SideBar);

const SideBarContainer = styled.div`
	width: 19.8rem;
	height: 62rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: --webkit-sticky;
	position: sticky;
	top: 5rem;
	left: 0;
`;
const SlideMenu = styled.ul`
	width: 13.8rem;
	height: 11.5rem;
	position: absolute;
	top: -10rem;
	z-index: 3;
	background-color: #fff;
	box-shadow: -3px 4px 30px #0000001a;
	transition: all 0.5s;
	${(props) =>
		props.active
			? `transform:translateY(6.2rem);`
			: `transform:translateY(0rem);`}
`;
const SlideMenuItem = styled.li`
	width: 100%;
	height: 5.75rem;
	line-height: 5.75rem;
	text-align: center;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
	cursor: pointer;
`;
const LogoImg = styled.img`
	width: 5.8rem;
	height: 5.8rem;
	margin-top: 5.8rem;
	margin-bottom: 3rem;
	cursor: pointer;
`;
const MainMenu = styled.ul`
	width: 13.8rem;
	height: 47rem;
	padding: 1.9rem 0;
	background-color: #ffffff;
	box-shadow: -3px 4px 30px #0000001a;
	border-radius: 4px;
`;
const MainMenuItem = styled.li`
	width: 13.8rem;
	height: 6.2rem;
	line-height: 6.2rem;
	text-align: center;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #2a3349;
	cursor: pointer;
	${(props) => props.select && `color:#A8B0C3 `}
`;
