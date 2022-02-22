import React, { useEffect, useMemo, useRef, useState } from 'react';
import { priceToString } from '../../functions/PriceToString';
import { dateObjToTimer } from '../../functions/DateObjToDate';
import {
	addrTransform,
	productTransform,
} from '../../functions/StringTransform';
import * as _order from '../../controller/payment';
import styled from 'styled-components';

const OrderDetail = (props) => {
	const orderer = ['이름', 'e-mail', '연락처/주소', '결제수단'];
	const receiver = ['이름', '연락처/주소', '배송 요청사항'];
	const header = ['상품/옵션명', '수량', '금액'];
	const process = [
		'주문일',
		'결제일',
		'배송시작',
		'배송완료',
		'취소요청',
		'취소완료',
		'반품요청',
		'교환요청',
		'환불완료',
	];
	const modalBox = useRef();
	const [detail, setDetail] = useState({});
	const [product_list, setProduct_list] = useState([]);

	useEffect(() => {
		_order.get_detail(props.modal.payment_id).then((res) => {
			setDetail(res.data.payment);
			setProduct_list(res.data.payment_product_list);
		});
	}, [props.modal.payment_id]);

	const close = () => {
		props.setModal({ type: '' });
	};

	const getTotalPrice = (arr) => {
		let price = 0;
		for (let i = 0; i < arr.length; i++) {
			price += arr[i].amount;
		}
		return price;
	};
	const totalPrice = useMemo(
		() => getTotalPrice(product_list),
		[product_list]
	);

	return (
		<Container>
			<Wrap>
				<Content>
					<Title>주문자 정보</Title>
					<Table>
						{orderer.map((el, idx) => (
							<OrdererList key={idx}>
								<OrdererLeft>{el}</OrdererLeft>
								{detail && (
									<OrdererRight>
										{idx === 0
											? detail.buyer_name
											: idx === 1
											? detail.buyer_email
											: idx === 2
											? detail.buyer_addr &&
											  `${detail.buyer_tel} / ${addrTransform(
													detail.buyer_addr
											  )}`
											: `카드 결제`}
									</OrdererRight>
								)}
							</OrdererList>
						))}
					</Table>
				</Content>
				<Content>
					<Title>배송지 정보</Title>
					<Table>
						{receiver.map((el, idx) => (
							<OrdererList key={idx}>
								<OrdererLeft>{el}</OrdererLeft>
								{detail && (
									<OrdererRight>
										{idx === 0
											? detail.del_name
											: idx === 1
											? detail.del_addr &&
											  `${detail.del_tel} / ${addrTransform(
													detail.del_addr
											  )}`
											: detail.del_req}
									</OrdererRight>
								)}
							</OrdererList>
						))}
					</Table>
				</Content>
				<Content>
					<Title>주문 상품</Title>
					<Table>
						<ProductHeader>
							{header.map((el, idx) => (
								<HeaderItem key={idx}>{el}</HeaderItem>
							))}
						</ProductHeader>
						{product_list.map((el, idx) => (
							<ProductList key={idx}>
								<ListItem>{productTransform(el.name)}</ListItem>
								<ListItem>{el.quantity}</ListItem>
								<ListItem>{`${priceToString(el.amount)}원`}</ListItem>
							</ProductList>
						))}

						<ProductFooter>
							<FooterItem>총 금액</FooterItem>
							<FooterItem>{`${priceToString(totalPrice)}원`}</FooterItem>
						</ProductFooter>
					</Table>
				</Content>
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
								{detail.create_at
									? dateObjToTimer(detail.create_at)
									: ''}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.create_at
									? dateObjToTimer(detail.create_at)
									: ''}
							</ProcessBodyItem>
							<ProcessBodyItem>{`배송시작`}</ProcessBodyItem>
							<ProcessBodyItem>{`2022-01-11\n15:24`}</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.claim_at ? dateObjToTimer(detail.claim_at) : ''}
							</ProcessBodyItem>
							<ProcessBodyItem>
								{detail.cancel_at
									? dateObjToTimer(detail.cancel_at)
									: ''}
							</ProcessBodyItem>
							<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
							<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
							<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
						</ProcessBody>
					</Table>
				</Content>
				<Button onClick={close}>확인</Button>
			</Wrap>
		</Container>
	);
};

export default OrderDetail;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 94rem;
	padding: 3.6rem 8.7rem 5rem 8.7rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0vh;
	left: 50%;
	transform: translate(-50%, 50%);
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Content = styled.div`
	width: 100%;
	margin-bottom: 2rem;
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

const OrdererList = styled.li`
	width: 100%;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e5e6ed;
	:nth-last-child(1) {
		border: none;
	}
`;
const OrdererLeft = styled.div`
	width: 15%;
	height: 100%;
	padding: 0 2rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	background-color: #f5f5f5;
	border-right: 1px solid #e5e6ed;
`;
const OrdererRight = styled.div`
	width: 85%;
	height: 100%;
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #2a3349;
`;

const ProductHeader = styled.li`
	width: 100%;
	height: 100%;
	text-align: center;
	display: flex;
	border-bottom: 1px solid #e5e6ed;
`;
const HeaderItem = styled.p`
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	background-color: #f5f5f5;
	:nth-child(1) {
		width: 62%;
		border-right: 1px solid #e5e6ed;
	}
	:nth-child(2) {
		width: 12%;
		border-right: 1px solid #e5e6ed;
	}
	:nth-child(3) {
		width: 26%;
	}
`;
const ProductFooter = styled(ProductHeader)``;
const FooterItem = styled.p`
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	color: #5e667b;
	:nth-child(1) {
		width: 74%;
		font-family: 'kr-b';
		color: #848ca2;
		border-right: 1px solid #e5e6ed;
		background-color: #f5f5f5;
	}
	:nth-child(2) {
		width: 26%;
	}
`;
const ProductList = styled.li`
	width: 100%;
	height: 100%;
	text-align: center;
	display: flex;
	border-bottom: 1px solid #e5e6ed;
`;
const ListItem = styled.p`
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	color: #5e667b;

	:nth-child(1) {
		width: 62%;
		border-right: 1px solid #e5e6ed;
	}
	:nth-child(2) {
		width: 12%;
		border-right: 1px solid #e5e6ed;
	}
	:nth-child(3) {
		width: 26%;
	}
`;

const ProcessHeader = styled.ul`
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	text-align: center;
	border-bottom: 1px solid e5e6ed;
`;
const ProcessHeaderItem = styled.li`
	width: 11.11111%;
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
	width: 11.11111%;
	height: 100%;
	font-size: 1.2rem;
	color: #5e667b;
	padding-top: 2rem;
	white-space: pre-wrap;
	border-right: 1px solid #e5e6ed;
	:nth-last-child(1) {
		border: none;
	}
	:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;
const Button = styled.button`
	margin-top: 3rem;
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
