import React, { useState } from 'react';
import styled from 'styled-components';

const OptionModal = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [discount, setDiscount] = useState('');

	return (
		<Container>
			<Wrap></Wrap>
		</Container>
	);
};

export default OptionModal;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 41.1rem;
	height: 39rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 10vh;
	left: 50%;
	transform: translate(-50%, 50%);
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
