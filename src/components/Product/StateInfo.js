import React, { useState } from 'react';
import styled from 'styled-components';

const StateInfo = (props) => {
	const [display, setDisplay] = useState(false);
	const [recommend, setRecommend] = useState(false);
	const displayItems = ['노출', '노출안함'];
	const recommendItems = ['추천상품', '등록안함'];

	const displayController = (e) => {
		const text = e.target.innerText;
		if (
			// props.createMode ||
			(text === '노출' && display) ||
			(text === '노출안함' && !display)
		) {
			return;
		} else {
			text === '노출' ? setDisplay(true) : setDisplay(false);
		}
	};

	const recommendController = (e) => {
		const text = e.target.innerText;
		if (
			// props.createMode ||
			(text === '추천상품' && recommend) ||
			(text === '등록안함' && !recommend)
		) {
			return;
		} else {
			text === '추천상품' ? setRecommend(true) : setRecommend(false);
		}
	};

	return (
		<Container>
			<Head>상태 정보</Head>
			<Body>
				<Content>
					<Left>
						<LeftInner>
							<Title>노출 상태 관리</Title>
							<Desc>추천 상품으로 등록했을 시 취소가 불가능합니다.</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<TypeBox>
								{displayItems.map((el, idx) => (
									<TypeItem
										key={idx}
										active={idx === 0 ? display : !display}
										onClick={displayController}>
										{el}
									</TypeItem>
								))}
							</TypeBox>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<Left>
						<LeftInner>
							<Title>추천 상품 등록</Title>
							<Desc>노출중인 상품만 등록이 가능합니다.</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<TypeBox>
								{recommendItems.map((el, idx) => (
									<TypeItem
										key={idx}
										active={idx === 0 ? recommend : !recommend}
										onClick={recommendController}>
										{el}
									</TypeItem>
								))}
							</TypeBox>
						</RightInner>
					</Right>
				</Content>
			</Body>
		</Container>
	);
};

export default StateInfo;

const Container = styled.div`
	width: 119rem;
	/* height: 20.8rem; */
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
`;
const TypeBox = styled.div`
	width: 40rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	border: 1px solid #a8b0c3;
`;
const TypeItem = styled.div`
	width: 50%;
	height: 3.1rem;
	line-height: 3.1rem;
	text-align: center;
	font-size: 1.4rem;
	border-radius: 4px;
	${(props) =>
		props.active
			? `color:#111A31; font-family:'kr-b'; 
				border:2px solid #A8B0C3;`
			: `color: #5E667B;  `}
`;
