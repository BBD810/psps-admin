import React, { useRef } from 'react';
import styled from 'styled-components';

const Confirm = (props) => {
	const modalBox = useRef();

	const onMouseDown = (e) => {
		props.modal.type !== '' &&
			(!modalBox.current || !modalBox.current.contains(e.target)) &&
			props.setModal({ type: '' });
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap ref={modalBox}>
				<Text>{props.modal.text}</Text>
				<Button
					onClick={() => {
						props.setModal({ type: '' });
					}}>
					확인
				</Button>
			</Wrap>
		</Container>
	);
};

export default Confirm;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Wrap = styled.div`
	width: 41.1rem;
	height: 21.6rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Text = styled.p`
	height: 5.6rem;
	line-height: 2.8rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-bottom: 5rem;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
