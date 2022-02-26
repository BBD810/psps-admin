import React from 'react';
import styled from 'styled-components';

const OrderClaimModal = (props) => {
	const selectConfirm = () => {
		props.setModal({ ...props.modal, act: '', return: true });
	};
	const selectClose = () => {
		props.setModal({ ...props.modal, act: '', return: false });
	};

	return (
		<Container>
			<Wrap>
				<Text>{props.modal.data.process}</Text>
				<Reason>
					<Left>취소사유:</Left>
					<Right>{props.modal.data.claim_reason}</Right>
				</Reason>
				<Buttons>
					<Button border onClick={selectClose}>
						닫기
					</Button>
					<Button filled onClick={selectConfirm}>
						취소처리
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
	height: 2.9rem;
	line-height: 2.9rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-bottom: 2.7rem;
`;
const Reason = styled.div`
	max-width: 90%;
	display: flex;
	align-items: center;
	margin-bottom: 7.8rem;
`;
const Left = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	margin-right: 0.8rem;
`;
const Right = styled.p`
	max-width: 90%;
	font-size: 1.2rem;
	color: #7f8697;
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
