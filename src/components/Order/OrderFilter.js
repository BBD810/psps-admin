import React, { useState } from 'react';
import * as orderController from '../../controller/payment';
import styled from 'styled-components';
import check_icon from '../../images/check_black_icon.svg';
import uncheck_icon from '../../images/empty_black_icon.svg';
import useDidMountEffect from '../../components/useDidMountEffect';
import Spinner from '../Spinner';

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
	const [isLoading, setIsLoading] = useState(false);
	const items = [
		{ title: '기간', desc: '기간별 주문내역을 조회합니다.' },
		{ title: '주문상태', desc: '주문상태별 주문내역을 조회합니다.' },
	];
	const orderState = [
		'입금전',
		'결제완료',
		'배송중',
		'배송완료',
		'취소요청',
		'교환요청',
		'환불요청',
		'처리완료',
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
		props.period !== 5 && props.setPeriod(5);
		props.setDate({ ...props.date, from: e.target.value });
	};
	const onChangeTo = (e) => {
		props.period !== 5 && props.setPeriod(5);
		props.setDate({ ...props.date, to: e.target.value });
	};
	const onChangeState = (text) => {
		let arr = [...props.state];
		if (arr.includes(text)) {
			arr = arr.filter((el) => el !== text);
		} else {
			arr.push(text);
		}
		props.setState(arr);
	};

	const get_process = (arr) => {
		let text = '';
		let _arr = [...arr];
		if (_arr.length < 1) {
			text = '';
		} else {
			for (let i = 0; i < _arr.length; i++) {
				if (i === 0) {
					text += _arr[i];
				} else {
					text += `,${_arr[i]}`;
				}
			}
		}
		return text;
	};

	useDidMountEffect(() => {
		onSubmit();
	}, [props.page]);

	const onClick = () => {
		props.setPage(1);
		onSubmit();
	};

	const onSubmit = () => {
		setIsLoading(true);
		let from, to, process;
		process = get_process(props.state);
		if (props.period !== 5) {
			to = 0;
			from = typeof props.period === 'number' ? props.period : 3;
			get_order_list(from, to, process, props.page);
		} else {
			if (!props.date.from) {
				props.setModal({
					type: 'confirm',
					text: '시작 날짜를 선택해주세요.',
				});
			} else if (!props.date.to) {
				props.setModal({
					type: 'confirm',
					text: '끝 날짜를 선택해주세요.',
				});
			} else if (props.date.from && props.date.to) {
				if (props.date.from > props.date.to) {
					props.setModal({
						type: 'confirm',
						text: '끝 날짜가 시작 날짜보다 이릅니다.',
					});
				} else {
					get_order_list(
						props.date.from,
						props.date.to,
						process,
						props.page
					);
				}
			}
		}
		setIsLoading(false);
	};
	const get_order_list = (from, to, process, page) => {
		orderController.getList(from, to, process, page).then((res) => {
			if (res.data.success) {
				props.setTotal(res.data.total);
				props.setList(res.data.payment_product_list);
			}
		});
	};

	return (
		<Container>
			{isLoading && <Spinner />}
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
								<ItemText onClick={clickToday}>오늘</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='1 month'
									src={props.period === 1 ? check_icon : uncheck_icon}
									onClick={clickOneMonth}
								/>
								<ItemText onClick={clickOneMonth}>1개월</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='3 month'
									src={props.period === 3 ? check_icon : uncheck_icon}
									onClick={clickThreeMonth}
								/>
								<ItemText onClick={clickThreeMonth}>3개월</ItemText>
							</Item>
							<Item>
								<CheckIcon
									alt='period setting'
									src={props.period === 5 ? check_icon : uncheck_icon}
									onClick={clickCalendar}
								/>
								<ItemText onClick={clickCalendar}>
									달력에서 찾기
								</ItemText>
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
						<RightInner className='grid'>
							{orderState.map((el, idx) => (
								<Item key={idx}>
									<CheckIcon
										alt=''
										src={
											props.state.includes(el)
												? check_icon
												: uncheck_icon
										}
										onClick={() => {
											onChangeState(el);
										}}
									/>
									<ItemText
										onClick={() => {
											onChangeState(el);
										}}>
										{el}
									</ItemText>
								</Item>
							))}
						</RightInner>
					</Right>
				</Content>
			</Body>
			<Button onClick={onClick}>적용하기</Button>
		</Container>
	);
};

export default React.memo(OrderFilter);

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
	:nth-child(2) .grid {
		width: 65%;
		height: 100%;
		padding: 2rem 4rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
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
	cursor: pointer;
`;
const CheckIcon = styled.img`
	width: 2.4rem;
	height: 1.7rem;
	margin-right: 0.6rem;
	cursor: pointer;
`;
const DatePicker = styled.input`
	width: 11.5rem;
	margin-left: 0.8rem;
	cursor: pointer;
	::-webkit-calendar-picker-indicator {
		cursor: pointer;
	}
`;
const Text = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-left: 0.5rem;
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
	margin-top: 1rem;
	margin-bottom: 3.9rem;
`;
