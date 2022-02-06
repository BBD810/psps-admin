import React from 'react';
import styled from 'styled-components';
import check_icon from '../../images/check_icon.svg';
import uncheck_icon from '../../images/empty_icon.svg';

const OrderFilter = () => {
	return (
		<Container>
			<Head>필터기능</Head>
			<Body>
				<Content>
					<Left>
						<LeftInner>
							<Title>기간</Title>
							<Desc>기간별 주문내역을 조회합니다.</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<Item>
								<CheckIcon alt='' src={check_icon} />
								<ItemText>오늘</ItemText>
							</Item>
							<Item>
								<CheckIcon alt='' src={check_icon} />
								<ItemText>1개월</ItemText>
							</Item>
							<Item>
								<CheckIcon alt='' src={check_icon} />
								<ItemText>3개월</ItemText>
							</Item>
							<Item>
								<CheckIcon alt='' src={check_icon} />
								<ItemText>달력에서 찾기</ItemText>
							</Item>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<Left>
						<LeftInner>
							<Title>카테고리</Title>
							<Desc>상품 카테고리별 주문내역을 조회합니다.</Desc>
						</LeftInner>
					</Left>
				</Content>
				<Content>
					<Left>
						<LeftInner>
							<Title>주문상태</Title>
							<Desc>주문상태별 주문내역을 조회합니다.</Desc>
						</LeftInner>
					</Left>
				</Content>
				<Content>
					<Left>
						<LeftInner>
							<Title>회원구분</Title>
							<Desc>회원,비회원별 주문내역을 조회합니다.</Desc>
						</LeftInner>
					</Left>
				</Content>
			</Body>
		</Container>
	);
};

export default OrderFilter;

const Container = styled.div`
	width: 119rem;
	margin-bottom: 4rem;
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
	background-color: #fff;
`;
const Content = styled.div`
	height: 9.1rem;
	display: flex;
	margin-bottom: 0.4rem;
	box-shadow: -3px 4px 30px #e5e6ed80;
	border-radius: 4px;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const Left = styled.div`
	width: 28rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LeftInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	border-right: 1px solid #f5f5f5;
`;
const Title = styled.h4`
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
	letter-spacing: 0.13px;
`;
const Desc = styled.p`
	margin-top: 1rem;
	font-size: 1rem;
	color: #848ca2;
	letter-spacing: -0.2px;
`;
const Right = styled(LeftInner)`
	width: 91rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RightInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	display: flex;
	/* display: grid;
	grid-template-columns: repeat(4, 1fr); */
`;
const Item = styled.div`
	height: 1.7rem;
	display: flex;
	align-items: center;
	margin-right: 3rem;
	:nth-last-child(1) {
		margin-right: 0;
	}
`;
const ItemText = styled.p`
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const CheckIcon = styled.img`
	width: 2.4rem;
	height: 1.7rem;
	margin-right: 0.6rem;
`;
const CalendarIcon = styled.img``;
