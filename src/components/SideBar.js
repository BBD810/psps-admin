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
	const menus = ['배너', '회원', '상품', '결제'];

	const slideController = () => {
		setPull(!pull);
	};
	const menuController = (e) => {
		props.getMenu(e.target.innerText);
	};
	const goLogout = () => {
		request.logout().then((res) => {
			if (res.data.success) {
				dispatch(admin_logout());
				alert('로그아웃 되었습니다.');
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
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;
const SlideMenu = styled.ul`
	width: 13.8rem;
	height: 11.5rem;
	position: absolute;
	top: -10rem;
	z-index: 3;
	background-color: #fff;
	box-shadow: -3px 4px 30px #0000001a;
	${(props) =>
		props.active
			? `
		transform:translateY(6rem);
		transition:all 0.5s;
	`
			: `transform:translateY(0rem); transition:all 0.5s`}
`;
const SlideMenuItem = styled.li`
	width: 100%;
	height: 5.75rem;
	line-height: 5.75rem;
	text-align: center;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const LogoImg = styled.img`
	width: 5.8rem;
	height: 5.8rem;
	margin-top: 5.8rem;
	margin-bottom: 3rem;
`;
const MainMenu = styled.ul`
	width: 13.8rem;
	height: 28.8rem;
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
	${(props) => props.select && `color:#A8B0C3 `}
`;
