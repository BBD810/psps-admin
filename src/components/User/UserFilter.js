import React from 'react';
import styled from 'styled-components';
import check_icon from '../../images/check_black_icon.svg';
import uncheck_icon from '../../images/empty_black_icon.svg';

const LeftWrap = ({ data }) => {
	return (
		<Left>
			<LeftInner>
				<Title>{data && data.title}</Title>
				<Desc>{data && data.desc}</Desc>
			</LeftInner>
		</Left>
	);
};

const UserFilter = (props) => {
	const items = [
		{ title: '검색', desc: '' },
		{ title: '고객구분', desc: '회원,비회원별 주문 내역을 조회합니다.' },
	];

	return (
		<Container>
			<Head>필터기능</Head>
			<Body>
				<Content>
					<LeftWrap data={items[0]} />
					<Right>
						<RightInner>
							{/* 이름, 전화번호로 검색 */}
							<Item></Item>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<LeftWrap data={items[1]} />
					<Right>
						<RightInner>
							{['회원', '비회원'].map((el, idx) => (
								<Item key={idx}>
									<CheckIcon alt='' src={check_icon} />
									<ItemText>{el}</ItemText>
								</Item>
							))}
						</RightInner>
					</Right>
				</Content>
			</Body>
		</Container>
	);
};

export default UserFilter;

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
	:nth-child(3) .grid {
		width: 65%;
		height: 100%;
		padding: 2rem 4rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
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

const Right = styled.div`
	width: 91rem;
	display: flex;
	align-items: center;
`;
const RightInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	display: flex;
`;
const Item = styled.div`
	min-width: 8rem;
	height: 3.1rem;
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
