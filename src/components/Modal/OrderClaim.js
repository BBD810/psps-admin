import React from 'react';
import styled from 'styled-components';

const OrderClaimModal = (props) => {
	const selectClose = () => {
		props.setModal({ ...props.modal, act: '', return: false });
	};
	const _data = props.modal.data;

	return (
		<Container>
			<Wrap>
				<Text>{_data.process}</Text>
				<Reason>
					<Left>사유:</Left>
					<Right>{_data.claim_reason}</Right>
				</Reason>
				<Button filled onClick={selectClose}>
					확인
				</Button>
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
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Wrap = styled.div`
	width: 43.4rem;
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
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
