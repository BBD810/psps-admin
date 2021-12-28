import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

const HomePage = () => {
	const [menu, setMenu] = useState('배너');
	const getMenu = (menu) => {
		setMenu(menu);
	};
	return (
		<div id='container'>
			<Container>
				<SideBar getMenu={getMenu} menu={menu} />
			</Container>
		</div>
	);
};

export default HomePage;

const Container = styled.div`
	width: 160rem;
	height: 100rem;
	display: flex;
	background-color: #fff;
	box-shadow: 2px 6px 30px #00000033;
	border-radius: 4px;
	border: 2px solid blue;
`;
