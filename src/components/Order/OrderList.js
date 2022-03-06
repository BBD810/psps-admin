import React from 'react';
import { priceToString } from '../../functions/PriceToString';
import { dateObjToTimer2 } from '../../functions/DateObjToDate';
import { productTransform } from '../../functions/StringTransform';
import styled from 'styled-components';
import PageSelector from '../PageSelector';

const OrderList = (props) => {
	const header = [
		'주문상태',
		'주문일',
		'주문번호',
		'상품명',
		'공급원',
		'주문자(이메일)',
		'결제금액',
		'결제수단',
	];

	const getButtonColor = (state) => {
		let color;
		if (state === '입금전') {
			color = '#E6843B';
		} else if (state === '결제완료') {
			color = '#96738E';
		} else if (state === '배송중') {
			color = '#214588';
		} else if (state === '취소요청') {
			color = '#E60F0F';
		} else if (state === '반품요청') {
			color = '#00A1C7';
		} else if (state === '교환요청') {
			color = '#6CC109';
		} else if (
			state === '배송완료' ||
			state === '취소완료' ||
			state === '환불완료'
		) {
			color = '#94A0B5';
		}
		return color;
	};
	const getDetail = (payment_uid) => {
		props.setModal({ type: 'detail', payment_uid });
	};

	return (
		<Container>
			<Head>주문내역</Head>
			<Body>
				<Header>
					{header.map((el, idx) => (
						<HeaderItem key={idx}>{el}</HeaderItem>
					))}
				</Header>
				<ListWrap>
					{props.list &&
						props.list.map((el, idx) => (
							<List key={idx}>
								<ListItem>
									<StateButton
										style={{
											backgroundColor: `${getButtonColor(
												el.process
											)}`,
										}}>
										{el.process}
									</StateButton>
								</ListItem>
								<ListItem>{`${dateObjToTimer2(
									el.create_at
								)}`}</ListItem>
								<ListItem>{el.payment_uid}</ListItem>
								<ListItem
									name='true'
									onClick={() => {
										getDetail(el.payment_uid);
									}}>
									{productTransform(el.name)}
								</ListItem>
								<ListItem>{el.supplier_name}</ListItem>
								<ListItem>{`${el.us_name}\n(${el.us_email})`}</ListItem>
								<ListItem>{priceToString(el.amount)}</ListItem>
								<ListItem>{`카드 결제`}</ListItem>
							</List>
						))}
				</ListWrap>
				<PageSelector
					page={props.page}
					total={props.total}
					onePage={props.onePage}
					onClickPage={props.onClickPage}
					style={{ marginTop: '6.2rem' }}
				/>
			</Body>
		</Container>
	);
};

export default OrderList;

const Container = styled.div`
	width: 119rem;
	margin-bottom: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Head = styled.div`
	width: 100%;
	margin-bottom: 0.4rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #fff;
	text-align: center;
	border-radius: 4px;
	background-color: #5e667b;
`;
const Body = styled.div`
	width: 100%;
	background-color: #fff;
`;
const Header = styled.ul`
	padding: 0 4rem;
	width: 100%;
	height: 4.6rem;
	line-height: 4.6rem;
	display: flex;
	justify-content: center;
	box-shadow: -3px 4px 30px #e5e6ed80;
	border-radius: 4px;
`;
const HeaderItem = styled.li`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #5e667b;
	:nth-child(1) {
		width: 7%;
		padding-left: 0.4rem;
	}
	:nth-child(2) {
		width: 10%;
	}
	:nth-child(3) {
		width: 8%;
	}
	:nth-child(4) {
		width: 20%;
	}
	:nth-child(5) {
		width: 15%;
	}
	:nth-child(6) {
		width: 20%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 10%;
	}
`;
const ListWrap = styled.div`
	width: 100%;
`;
const List = styled.ul`
	padding: 0 4rem;
	width: 100%;
	height: 6.7rem;
	display: flex;
	justify-content: center;
	align-items: center;
	:nth-child(odd) {
		border: 1px solid #f5f5f5;
		background-color: #fff;
	}
	:nth-child(even) {
		background-color: #f5f5f5;
	}
`;
const ListItem = styled.li`
	font-size: 1.2rem;
	color: #2a3349;
	word-break: keep-all;
	white-space: pre-wrap;
	:nth-child(2),
	:nth-child(3),
	:nth-child(5),
	:nth-child(8) {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-ms-line-clamp: 1;
		-moz-line-clamp: 1;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	:nth-child(4),
	:nth-child(6) {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-ms-line-clamp: 2;
		-moz-line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	:nth-child(1) {
		width: 7%;
	}
	:nth-child(2) {
		width: 10%;
	}
	:nth-child(3) {
		width: 8%;
	}
	:nth-child(4) {
		width: 20%;
	}
	:nth-child(5) {
		width: 15%;
	}
	:nth-child(6) {
		width: 20%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 10%;
	}
	${(props) =>
		props.name &&
		`:hover {
			text-decoration:underline;
			cursor:pointer;
	}`}
`;
const StateButton = styled.button`
	width: 6rem;
	height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #ffffff;
	border: none;
	border-radius: 4px;
	background-color: #e6843b;
`;
