import React, { useEffect, useState } from 'react';
import { priceToString } from '../../functions/PriceToString';
import { dateObjToTimer } from '../../functions/DateObjToDate';
import {
	addrTransform,
	productTransform,
} from '../../functions/StringTransform';
import * as _order from '../../controller/payment';
import styled from 'styled-components';
import check_icon from '../../images/check_square.svg';
import uncheck_icon from '../../images/uncheck_square.svg';
import TrackingNumberModal from './TrackingNumber';

const OrderDetail = (props) => {
	const orderer = ['이름', 'e-mail', '연락처/주소', '결제수단'];
	const receiver = ['이름', '연락처/주소', '배송 요청사항'];
	const order = ['주문번호', '총 결제 금액'];
	const header = [
		'상품/옵션명',
		'운송장번호',
		'고객요청',
		'일자확인',
		'수량',
		'금액',
	];

	const [detail, setDetail] = useState({});
	const [supplier_list, setSupplier_list] = useState([]);
	const [checked, setChecked] = useState([]);

	useEffect(() => {
		_order.get_detail(props.modal.payment_uid).then((res) => {
			setDetail(res.data.payment);
			setSupplier_list(res.data.supplier_list);
		});
	}, [props.modal.payment_uid]);

	const singleTrackingNumber = (el) => {
		setChecked([el]);
		enterTrackingNumber([el]);
	};
	const enterTrackingNumber = (list) => {
		if (list.length === 0) {
			alert('체크된 항목이 없습니다.');
		} else {
			props.setModal({ ...props.modal, act: 'tracking', data: list });
		}
	};
	const close = () => {
		props.setModal({ type: '' });
	};

	console.log('checked', checked);

	const allCheckItem = (supplier) => {
		let arr = [...checked];
		let _switch = false;
		for (let i = 0; i < supplier.product.length; i++) {
			//  체크가 안 된 애가 하나라도 있을 때
			if (!checked.includes(supplier.product[i])) {
				_switch = true;
				arr.push(supplier.product[i]);
			}
		}
		if (!_switch) {
			for (let i = 0; i < supplier.product.length; i++) {
				arr = arr.filter((el) => el !== supplier.product[i]);
			}
		}
		_switch = false;
		setChecked([...new Set(arr)]);
	};
	const checkItem = (el) => {
		let arr = [...checked];
		if (checked.includes(el)) {
			arr = arr.filter((e) => e !== el);
		} else {
			arr.push(el);
		}
		setChecked(arr);
	};

	useEffect(() => {
		console.log('props.modal', props.modal);
		let _modal = props.modal;
		if (_modal.return) {
			const data = {
				payment_product_list: checked,
				cou_id: _modal.return.id,
				cou_num: _modal.return.num,
			};
			console.log('data', data);
			_order.enter_tracking_number(data).then((res) => {
				console.log('res.data', res.data);
				if (res.data.success) {
					enterSuccess(res.data.supplier_list);
				} else {
					alert('배송지 입력에 실패했습니다.');
					props.setModal({ ...props.modal, return: '' });
				}
			});
		}
	}, [props.modal]);

	const enterSuccess = (list) => {
		props.setModal({ ...props.modal, return: '' });
		setChecked([]);
		setSupplier_list(list);
	};
	const enterFail = () => {};

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
					<Title>주문 내역</Title>
					<Table>
						{order.map((el, idx) => (
							<OrdererList key={idx}>
								<OrdererLeft>{el}</OrdererLeft>
								{detail && (
									<OrdererRight>
										{idx === 0
											? detail.payment_uid
											: priceToString(detail.amount)}
									</OrdererRight>
								)}
							</OrdererList>
						))}
					</Table>
				</Content>
				<Content>
					{supplier_list.map((supplier, index) => (
						<Supplier key={index}>
							<SupplierTitle>
								{supplier.info.supplier_name}
							</SupplierTitle>
							<Table>
								<ProductHeader>
									{header.map((el, idx) => (
										<HeaderItem key={idx}>
											{idx === 0 && (
												<CheckIcon
													alt=''
													src={uncheck_icon}
													onClick={() => {
														allCheckItem(supplier);
													}}
												/>
											)}
											{el}
										</HeaderItem>
									))}
								</ProductHeader>
								{supplier_list[index].product.map((el, idx) => (
									<ProductList key={idx}>
										<ListItem>
											<CheckIcon
												alt=''
												src={
													checked.includes(el)
														? check_icon
														: uncheck_icon
												}
												onClick={() => {
													checkItem(el);
												}}
											/>
											{productTransform(el.name)}
										</ListItem>
										<ListItem
											onClick={() => {
												singleTrackingNumber(el);
											}}>
											{el.cou_name && el.cou_num
												? `${el.cou_name} ${el.cou_num}`
												: '입력하기'}
										</ListItem>
										<ListItem>{`취소요청`}</ListItem>
										<ListItem>{`확인하기`}</ListItem>
										<ListItem>
											{`${priceToString(el.quantity)}`}
										</ListItem>
										<ListItem>
											{`${priceToString(el.amount)}`}
										</ListItem>
									</ProductList>
								))}
								<ProductList>
									<ListItem style={{ paddingLeft: '4.4rem' }}>
										배송비
									</ListItem>
									<ListItem></ListItem>
									<ListItem></ListItem>
									<ListItem></ListItem>
									<ListItem>1</ListItem>
									<ListItem>{priceToString(3000)}</ListItem>
								</ProductList>

								<ProductFooter>
									<FooterItem>총 금액</FooterItem>
									<FooterItem>
										{`${priceToString(supplier.amount + 3000)}`}
									</FooterItem>
								</ProductFooter>
							</Table>
						</Supplier>
					))}
				</Content>
				<SupplierBottom>
					<SupplierText>일괄 처리</SupplierText>
					<SupplierButton first>주문 취소</SupplierButton>
					<SupplierButton second>반품 / 교환 / 환불</SupplierButton>
					<SupplierButton>요청 거절</SupplierButton>
					<SupplierButton
						last
						onClick={() => {
							enterTrackingNumber(checked);
						}}>
						운송장 입력
					</SupplierButton>
				</SupplierBottom>
				<Buttons>
					<Button onClick={close}>확인</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default OrderDetail;

// const process = [
// 	'주문일',
// 	'결제일',
// 	'배송시작',
// 	'배송완료',
// 	'취소요청',
// 	'취소완료',
// 	'반품요청',
// 	'교환요청',
// 	'환불완료',
// ];

{
	/* <Content>
	<Title>주문상태별 일자</Title>
	<Table>
		<ProcessHeader>
			{process.map((el, idx) => (
				<ProcessHeaderItem key={idx}>{el}</ProcessHeaderItem>
			))}
		</ProcessHeader>
		<ProcessBody>
			<ProcessBodyItem> */
}
{
	/* {detail.create_at
									? dateObjToTimer(detail.create_at)
									: ''} */
}
// </ProcessBodyItem>
// <ProcessBodyItem>
{
	/* {detail.create_at
									? dateObjToTimer(detail.create_at)
									: ''} */
}
// </ProcessBodyItem>
// <ProcessBodyItem>{`배송시작`}</ProcessBodyItem>
// <ProcessBodyItem>{`2022-01-11\n15:24`}</ProcessBodyItem>
// <ProcessBodyItem>
{
	/* {detail.claim_at ? dateObjToTimer(detail.claim_at) : ''} */
}
// </ProcessBodyItem>
// <ProcessBodyItem>
{
	/* {detail.cancel_at
									? dateObjToTimer(detail.cancel_at)
									: ''} */
}
// 			</ProcessBodyItem>
// 			<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
// 			<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
// 			<ProcessBodyItem>{`2022-02-11\n15:24`}</ProcessBodyItem>
// 		</ProcessBody>
// 	</Table>
// </Content>;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 94rem;
	max-height: 95rem;
	overflow-y: scroll;
	padding: 4rem 5.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: -23%;
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
const Supplier = styled.div`
	margin-bottom: 2rem;
`;
const SupplierTitle = styled.h4`
	margin-bottom: 0.8rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const Table = styled.ul`
	width: 100%;
	border: 1px solid #e5e6ed;
`;
const SupplierBottom = styled.div`
	margin-top: 0.8rem;
	width: 100%;
	height: 3.1rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const SupplierText = styled.p`
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
`;
const SupplierButton = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	${(props) => (props.first ? ` margin-left:2rem;` : ` margin-left:0.8rem;`)}
	${(props) => (props.second ? `width:12rem;` : `width:10.6rem;`)}
	${(props) =>
		props.last
			? `background-color:#2A3349; color:#fff;`
			: `background-color:unset; color:#2A3349; 
				border:2px solid #2A3349`}
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
	padding: 0 2rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	text-align: center;
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	border-right: 1px solid #e5e6ed;
	:nth-child(1) {
		width: 34%;
	}
	:nth-child(2) {
		width: 24%;
	}
	:nth-child(3) {
		width: 11%;
		justify-content: center;
	}
	:nth-child(4) {
		width: 11%;
		justify-content: center;
	}
	:nth-child(5) {
		width: 8%;
		justify-content: center;
	}
	:nth-child(6) {
		width: 12%;
		justify-content: flex-end;
		border: none;
	}
`;
const CheckIcon = styled.img`
	width: 1.6rem;
	height: 1.6rem;
	margin-right: 0.8rem;
`;
const ProductFooter = styled(ProductHeader)``;
const FooterItem = styled.p`
	height: 3.1rem;
	line-height: 3.1rem;
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #5e667b;
	:nth-child(1) {
		width: 88%;
		font-family: 'kr-b';
		color: #848ca2;
		text-align: center;
		border-right: 1px solid #e5e6ed;
		background-color: #f5f5f5;
	}
	:nth-child(2) {
		width: 12%;
		text-align: right;
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
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #5e667b;
	display: flex;
	align-items: center;
	border-right: 1px solid #e5e6ed;
	:nth-child(1) {
		width: 34%;
	}
	:nth-child(2) {
		width: 24%;
	}
	:nth-child(3) {
		width: 11%;
		justify-content: center;
	}
	:nth-child(4) {
		width: 11%;
		justify-content: center;
	}
	:nth-child(5) {
		width: 8%;
		justify-content: center;
	}
	:nth-child(6) {
		width: 12%;
		justify-content: flex-end;
		border: none;
	}
`;

// const ProcessHeader = styled.ul`
// 	height: 3.1rem;
// 	line-height: 3.1rem;
// 	display: flex;
// 	text-align: center;
// 	border-bottom: 1px solid e5e6ed;
// `;
// const ProcessHeaderItem = styled.li`
// 	width: 11.11111%;
// 	height: 100%;
// 	font-size: 1.2rem;
// 	font-family: 'kr-b';
// 	color: #848ca2;
// 	background-color: #f5f5f5;
// 	border-right: 1px solid #e5e6ed;
// 	:nth-last-child(1) {
// 		border: none;
// 	}
// `;
// const ProcessBody = styled.ul`
// 	height: 7.4rem;
// 	display: flex;
// 	text-align: center;
// `;
// const ProcessBodyItem = styled.li`
// 	width: 11.11111%;
// 	height: 100%;
// 	font-size: 1.2rem;
// 	color: #5e667b;
// 	padding-top: 2rem;
// 	white-space: pre-wrap;
// 	border-right: 1px solid #e5e6ed;
// 	:nth-last-child(1) {
// 		border: none;
// 	}
// 	:hover {
// 		text-decoration: underline;
// 		cursor: pointer;
// 	}
// `;
const Buttons = styled.div`
	width: 100%;
	height: 3.1rem;
	display: flex;
	justify-content: center;
	margin-top: 0;
	margin-bottom: 3rem;
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
