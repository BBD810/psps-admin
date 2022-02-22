import React, { useEffect, useState } from 'react';
import { dateObjToDate } from '../../functions/DateObjToDate';
import { addrTransform } from '../../functions/StringTransform';
import { phoneNumberTransform } from '../../functions/PhoneNumberTransform';
import { priceToString } from '../../functions/PriceToString';
import * as _payment from '../../controller/payment';
import styled from 'styled-components';
import PageSelector from '../PageSelector';

const UserOrderModal = (props) => {
	const info = ['이름/이메일', '등록일', '주소', '연락처', '등록계좌'];
	const header = ['주문일', '주문상품', '결제금액', '주문상태'];

	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		if (props.modal.data) {
			setDetail(props.modal.data);
			_payment.get_user_order_list(props.modal.data.user_id).then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.payment_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.modal.data]);

	const onClickPage = (e) => {
		e !== props.page && props.setPage(e);
	};

	return (
		<Container>
			<Wrap>
				<Content>
					<Title>고객 정보</Title>
					<InfoTable>
						{detail &&
							info.map((el, idx) => (
								<InfoList key={idx}>
									<InfoLeft>{el}</InfoLeft>
									<InfoRight>
										{idx === 0
											? `${detail.name} / ${detail.email}`
											: idx === 1
											? dateObjToDate(detail.create_at)
											: idx === 2
											? addrTransform(detail.address)
											: idx === 3
											? phoneNumberTransform(detail.phone_number)
											: detail.account
											? detail.account
											: '등록되지 않음'}
									</InfoRight>
								</InfoList>
							))}
					</InfoTable>
				</Content>
				<Content>
					<Title>주문 내역</Title>
					<OrderTable>
						<OrderHeader>
							{header.map((el, idx) => (
								<OrderHeaderItem key={idx}>{el}</OrderHeaderItem>
							))}
						</OrderHeader>
						{list.map((el, idx) => (
							<OrderList key={idx}>
								<OrderItem>{dateObjToDate(el.create_at)}</OrderItem>
								<OrderItem>{el.name}</OrderItem>
								<OrderItem>{priceToString(el.amount)}</OrderItem>
								<OrderItem>{el.status}</OrderItem>
							</OrderList>
						))}
					</OrderTable>
				</Content>
				<PageSelector
					page={props.page}
					total={props.total}
					onePage={10}
					onClickPage={onClickPage}
					style={{ marginTop: '2rem' }}
				/>
			</Wrap>
		</Container>
	);
};

export default UserOrderModal;

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
	margin-bottom: 1rem;
`;
const Title = styled.h3`
	margin-bottom: 1rem;
	width: 100%;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const InfoTable = styled.ul`
	width: 100%;
	border: 1px solid #e5e6ed;
`;
const InfoList = styled.li`
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e5e6ed;
	:nth-last-child(1) {
		border: none;
	}
`;
const InfoLeft = styled.div`
	width: 15%;
	height: 100%;
	padding: 0 2rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	background-color: #f5f5f5;
`;
const InfoRight = styled.div`
	width: 85%;
	height: 100%;
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #2a3349;
`;

const OrderHeader = styled.li`
	height: 3.1rem;
	line-height: 3.1rem;
	border-bottom: 1px solid #e5e6ed;
	display: flex;
`;
const OrderHeaderItem = styled.div`
	text-align: center;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #848ca2;
	border-right: 1px solid #e5e6ed;
	background-color: #f5f5f5;
	:nth-child(1) {
		width: 20%;
	}
	:nth-child(2) {
		width: 38%;
	}
	:nth-child(3) {
		width: 21%;
	}
	:nth-child(4) {
		width: 21%;
	}
`;
const OrderTable = styled(InfoTable)`
	max-height: 33.1rem;
`;
const OrderList = styled(OrderHeader)``;
const OrderItem = styled(OrderHeaderItem)`
	font-family: 'kr-r';
	color: #2a3349;
	background-color: unset;
	:nth-child(1) {
		width: 20%;
	}
	:nth-child(2) {
		width: 38%;
	}
	:nth-child(3) {
		width: 21%;
	}
	:nth-child(4) {
		width: 21%;
	}
`;
