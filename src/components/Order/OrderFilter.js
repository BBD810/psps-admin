import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import check_icon from '../../images/check_black_icon.svg';
import uncheck_icon from '../../images/empty_black_icon.svg';
import down from '../../images/angle-down.svg';

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

const OrderFilter = (props) => {
	const partBox = useRef();
	const subPartBox = useRef();
	const [partOpen, setPartOpen] = useState(0);

	const items = [
		{ title: '기간', desc: '기간별 주문내역을 조회합니다.' },
		{ title: '카테고리', desc: '상품 카테고리별 주문내역을 조회합니다.' },
		{ title: '주문상태', desc: '주문상태별 주문내역을 조회합니다.' },
		{ title: '회원구분', desc: '회원,비회원별 주문내역을 조회합니다.' },
	];
	const orderState = [
		'입금전',
		'결제완료',
		'배송중',
		'배송완료',
		'취소요청',
		'반품요청',
		'교환요청',
		'환불완료',
		'취소완료',
	];

	const clickToday = () => {
		props.period === 0 ? props.setPeriod('') : props.setPeriod(0);
	};
	const clickOneMonth = () => {
		props.period === 1 ? props.setPeriod('') : props.setPeriod(1);
	};
	const clickThreeMonth = () => {
		props.period === 3 ? props.setPeriod('') : props.setPeriod(3);
	};
	const clickCalendar = () => {
		props.period === 5 ? props.setPeriod('') : props.setPeriod(5);
	};
	const onChangeStart = (e) => {
		// 끝날짜보다 빨라야함
		props.setPeriod(5);
		props.setDate({ ...props.date, from: e.target.value });
	};
	const onChangeTo = (e) => {
		// 시작날짜보다 늦어야함
		props.setPeriod(5);
		props.setDate({ ...props.date, to: e.target.value });
	};

	const onChangePart = (e) => {
		const text = e.target.innerText;
		props.part !== text && props.setPart(text);
		setPartOpen(0);
	};
	const onChangeSubPart = (e) => {
		const text = e.target.innerText;
		props.subPart !== text && props.setSubPart(text);
		setPartOpen(0);
	};
	const onChangeState = (text) => {
		console.log('text', text);
		console.log('state1', props.state);
		if (props.state.has(text)) {
			props.setState(props.state.remove(text));
		} else {
			props.setState(props.state.add(text));
		}
		console.log('state2', props.state);
	};

	const onMouseDown = (e) => {
		partOpen !== 0 &&
			(!partBox.current || !partBox.current.contains(e.target)) &&
			(!subPartBox.current || !subPartBox.current.contains(e.target)) &&
			setPartOpen(0);
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Head>필터기능</Head>
			<Body>
				<Content>
					<LeftWrap data={items[0]} />
					<Right>
						<RightInner>
							<Item>
								<CheckIcon
									alt='today'
									src={props.period === 0 ? check_icon : uncheck_icon}
									onClick={clickToday}
								/>
								<ItemText>오늘</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='1 month'
									src={props.period === 1 ? check_icon : uncheck_icon}
									onClick={clickOneMonth}
								/>
								<ItemText>1개월</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='3 month'
									src={props.period === 3 ? check_icon : uncheck_icon}
									onClick={clickThreeMonth}
								/>
								<ItemText>3개월</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='period setting'
									src={props.period === 5 ? check_icon : uncheck_icon}
									onClick={clickCalendar}
								/>
								<ItemText>달력에서 찾기</ItemText>
								<DatePicker type='date' onChange={onChangeStart} />
								<Text>~</Text>
								<DatePicker type='date' onChange={onChangeTo} />
							</Item>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<LeftWrap data={items[1]} />
					<Right>
						<RightInner>
							<Parts>
								<Part>
									{partOpen === 1 ? (
										<PartSelectWrap ref={partBox}>
											<PartSelectList>
												{props.part && `${props.part}`}
											</PartSelectList>
											{props.partList.map((el, idx) => (
												<PartSelectList
													key={idx}
													onClick={onChangePart}>
													{el.title}
												</PartSelectList>
											))}
										</PartSelectWrap>
									) : (
										<PartSelected
											onClick={() => {
												setPartOpen(1);
											}}>
											<PartText>
												{props.part && `대분류 - ${props.part}`}
											</PartText>
											<PartSelectImg
												alt='select button'
												src={down}
											/>
										</PartSelected>
									)}
								</Part>
								<Part>
									{partOpen === 2 ? (
										<PartSelectWrap ref={subPartBox}>
											<PartSelectList>
												{props.subPart && `${props.subPart}`}
											</PartSelectList>
											{props.subPartList.map((el, idx) => (
												<PartSelectList
													key={idx}
													onClick={onChangeSubPart}>
													{el}
												</PartSelectList>
											))}
										</PartSelectWrap>
									) : (
										<PartSelected
											onClick={() => {
												setPartOpen(2);
											}}>
											<PartText>
												{props.subPart &&
													`소분류 - ${props.subPart}`}
											</PartText>
											<PartSelectImg
												alt='select button'
												src={down}
											/>
										</PartSelected>
									)}
								</Part>
							</Parts>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<LeftWrap data={items[2]} />
					<Right>
						<RightInner className='grid'>
							{orderState.map((el, idx) => (
								<Item key={idx}>
									<CheckIcon
										alt=''
										src={
											props.state === el ? check_icon : uncheck_icon
										}
										onClick={() => {
											onChangeState(el);
										}}
									/>
									<ItemText>{el}</ItemText>
								</Item>
							))}
						</RightInner>
					</Right>
				</Content>
				<Content>
					<LeftWrap data={items[3]} />
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
			<Button>적용하기</Button>
		</Container>
	);
};

export default OrderFilter;

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
const DatePicker = styled.input`
	width: 11.5rem;
	margin-left: 0.8rem;
`;
const Text = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-left: 0.5rem;
`;
const Parts = styled.div`
	width: 33rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
`;
const Part = styled.div`
	width: 100%;
	position: relative;
	:nth-child(1) {
		margin-right: 1rem;
	}
`;
const PartSelected = styled.div`
	width: 16rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
`;
const PartText = styled.p`
	width: 100%;
	font-size: 1.2rem;
	color: #7f8697;
`;
const PartSelectImg = styled.img`
	width: 0.7rem;
	height: 0.6rem;
	position: absolute;
	right: 1rem;
`;
const PartSelectWrap = styled.ul`
	width: 16rem;
	max-height: 16rem;
	line-height: 3.1rem;
	position: absolute;
	top: -1.6rem;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #5e667b;
		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		background-color: #fff;
	}
`;
const PartSelectList = styled.li`
	height: 3.1rem;
	line-height: 3.1rem;
	padding: 0 0.8rem;
	cursor: pointer;
	:nth-child(1) {
		border-bottom: 1px solid #e5e6ed;
	}
	:hover {
		background-color: #e5e6ed;
	}
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	color: #fff;
	margin-top: 1rem;
	margin-bottom: 3.9rem;
`;
