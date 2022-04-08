import React, { useEffect, useState } from 'react';
import { dateObjToTimer } from '../../../utils/DateObjToDate';
import styled from 'styled-components';

const OrderProcess = (props) => {
	const process = [
		'주문일',
		'결제일',
		'운송장번호',
		'취소요청',
		'교환요청',
		'환불요청',
		'요청처리완료',
	];

	const [detail, setDetail] = useState({});

	useEffect(() => {
		props.modal.data && setDetail(props.modal.data);
	}, [props.modal.data]);

	const onClick = () => {
		props.setModal({ ...props.modal, act: '' });
	};

	return (
		<Container>
			<Wrap>
				<Content>
					<Title>주문상태별 일자</Title>
					<Table>
						<ProcessHeader>
							{process.map((el, idx) => (
								<ProcessHeaderItem key={idx}>{el}</ProcessHeaderItem>
							))}
						</ProcessHeader>
						<ProcessBody>
							<ProcessBodyItem>
								{detail.create_at && dateObjToTimer(detail.create_at)}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.create_at && dateObjToTimer(detail.create_at)}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.cou_name &&
									detail.cou_num &&
									`${detail.cou_name}\n${detail.cou_num}`}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.process === '취소요청' &&
									dateObjToTimer(detail.claim_at)}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.process === '교환요청' &&
									dateObjToTimer(detail.claim_at)}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.process === '환불요청' &&
									dateObjToTimer(detail.claim_at)}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.process === '처리완료' &&
									dateObjToTimer(detail.confirm_at)}
							</ProcessBodyItem>
						</ProcessBody>
					</Table>
				</Content>
				<Button onClick={onClick}>확인</Button>
			</Wrap>
		</Container>
	);
};

export default OrderProcess;

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
	width: 84.6rem;
	height: 27.5rem;
	padding: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Content = styled.div`
	width: 100%;
	margin-bottom: 2rem;
	:nth-last-child(1) {
		margin-bottom: 5rem;
	}
`;
const Title = styled.h3`
	margin-bottom: 1rem;
	width: 100%;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const Table = styled.ul`
	width: 100%;
	border: 1px solid #e5e6ed;
`;

const ProcessHeader = styled.ul`
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	text-align: center;
	border-bottom: 1px solid e5e6ed;
`;
const ProcessHeaderItem = styled.li`
	width: 14.285714%;
	height: 100%;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	background-color: #f5f5f5;
	border-right: 1px solid #e5e6ed;
	:nth-last-child(1) {
		border: none;
	}
`;
const ProcessBody = styled.ul`
	height: 7.4rem;
	display: flex;
	text-align: center;
`;
const ProcessBodyItem = styled.li`
	width: 14.285714%;
	height: 100%;
	font-size: 1.2rem;
	color: #5e667b;
	padding-top: 2rem;
	white-space: pre-wrap;
	border-right: 1px solid #e5e6ed;
	:nth-child(3) {
		word-break: break-all;
	}
	:nth-last-child(1) {
		border: none;
	}
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
