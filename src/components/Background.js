import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import logo from '../images/cetus-logo.svg';
const Background = () => {
	const admin = useSelector((state) => state.admin);
	const active = admin.login;

	return (
		<All>
			<Left active={active} />
			<Right>
				<OutsideCircle active={active}>
					<InsideCircle active={active} />
					<LogoImage alt='logo img' src={logo} active={active} />
				</OutsideCircle>
			</Right>
		</All>
	);
};

export default Background;

const All = styled.div`
	width: 1280px;
	height: 720px;
	max-width: 1280px;
	max-height: 720px;
	display: flex;
	position: fixed;
	top: 50%;
	transform: translateY(-50%);
	z-index: -10;
	overflow-x: hidden;
	background: #e5e6ed 0% 0% no-repeat padding-box;
`;
const Left = styled.div`
	width: 46.71875%;
	height: 100%;
	margin-right: 7.96875%;
	background: transparent linear-gradient(180deg, #111a31 0%, #5e667b 100%) 0%
		0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #0000004d;
	border-radius: 0px 150px 150px 0px;
	opacity: 1;
	z-index: -10;
	overflow-x: hidden;
	${(props) =>
		props.active &&
		`
		border-radius:0 50px 50px 0;
		transform:translateX(-46.7rem);
		transform-origin:100% 0;
		transition: all 0.8s;
	`}
`;
const Right = styled.div`
	width: 45.3125%;
	height: 100%;
	opacity: 1;
	overflow-x: hidden;
`;
const OutsideCircle = styled.div`
	width: 119.45%;
	height: 100%;
	background: transparent linear-gradient(180deg, #111a31 0%, #5e667b 100%) 0%
		0% no-repeat padding-box;
	border-radius: 100%;
	overflow-x: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	${(props) =>
		props.active &&
		`
		transform:translateX(407px);
		transition:transform 0.8s;
	`}
`;
const InsideCircle = styled.div`
	width: 20.1%;
	height: 20.1%;
	background: #e5e6ed 0% 0% no-repeat padding-box;
	box-shadow: inset 0px 3px 6px #0000004d;
	border-radius: 100%;
	overflow-x: hidden;
	opacity: 1;
	${(props) =>
		props.active &&
		`
		transform:scale(3.3);
		transform-origin:50% 50%;
		transition:transform 0.8s;
	`}
`;
const LogoImage = styled.img`
	width: 9.4rem;
	height: 1.8rem;
	z-index: 10;
	transform: rotate(270deg);
	position: fixed;
	right: 54%;
	opacity: 0;
	${(props) =>
		props.active &&
		`
		opacity:1;
		transition:1s`}
`;
