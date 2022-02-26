import React from 'react';
import styled from 'styled-components';

const OrderClaimModal = (props) => {
	const selectYes = () => {
		props.setModal({ ...props.modal, type: '', return: true });
	};
	const selectNo = () => {
		props.setModal({ ...props.modal, type: '', return: false });
	};

	return (
		<Container>
			<Wrap>
				<Text>{props.modal.data.process}</Text>
				<Buttons>
					<Button border onClick={selectNo}>
						아니요
					</Button>
					<Button filled onClick={selectYes}>
						예
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default OrderClaimModal;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 43.4rem;
	height: 26.2rem;
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
const Text = styled.p`
	height: 5.6rem;
	line-height: 2.8rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-bottom: 5rem;
`;
const Buttons = styled.div`
	display: flex;
	align-items: center;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	${(props) =>
		props.border &&
		`margin-right:0.8rem; border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
`;
