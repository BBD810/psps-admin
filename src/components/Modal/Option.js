import React, { useEffect, useState } from 'react';
import { priceToString } from '../../functions/PriceToString';
import styled from 'styled-components';

const OptionModal = (props) => {
	const [title, setTitle] = useState('');
	const [name, setName] = useState(null);
	const [weight, setWeight] = useState(null);
	const [price, setPrice] = useState('');
	const [discount, setDiscount] = useState('');
	const [check, setCheck] = useState(false);

	useEffect(() => {
		if (props.modal.act === 'edit') {
			const data = props.modal.data;
			setTitle(data.title);
			setPrice(data.price);
			setDiscount(data.discount);
			setName(data.name);
			setWeight(data.weight);
		}
	}, [props.modal.act]);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangePrice = (e) => {
		setPrice(e.target.value);
	};
	const onChangeDiscount = (e) => {
		setDiscount(e.target.value);
	};
	const onChangeName = (e) => {
		setName(e.target.value);
	};
	const onChangeWeight = (e) => {
		setWeight(e.target.value);
	};

	const selectYes = () => {
		if (title.trim() && price.trim() && discount.trim()) {
			props.setModal({
				...props.modal,
				type: '',
				return: {
					title,
					price,
					discount,
					name,
					weight,
					state: 'O',
					stock: true,
				},
			});
		}
	};
	const selectNo = () => {
		props.setModal({ ...props.modal, type: '' });
	};

	useEffect(() => {
		title && price && discount ? setCheck(true) : setCheck(false);
	}, [title, price, discount]);

	return (
		<Container>
			<Wrap>
				<Text>{`옵션에 대한 정보를 입력해주세요.`}</Text>
				<Item>
					<Title>옵션명</Title>
					<Input
						defaultValue={title}
						placeholder='(필수) 옵션명을 입력해주세요.'
						onChange={onChangeTitle}
					/>
				</Item>
				<Item>
					<Title>가격/개</Title>
					<Input
						type='number'
						defaultValue={price}
						placeholder='(필수) 숫자로 입력해주세요.'
						onChange={onChangePrice}
					/>
				</Item>
				<Item>
					<Title>할인 금액</Title>
					<Input
						type='number'
						defaultValue={discount}
						placeholder='(필수) 없을 경우 "0"을 입력해주세요.'
						onChange={onChangeDiscount}
					/>
				</Item>
				<Item>
					<Title>품목 명칭</Title>
					<Input
						defaultValue={name}
						placeholder='빈 값일 경우 "상세이미지 참조" 노출'
						onChange={onChangeName}
					/>
				</Item>
				<Item>
					<Title>중량</Title>
					<Input
						defaultValue={weight}
						placeholder='빈 값일 경우 "상세이미지 참조" 노출'
						onChange={onChangeWeight}
					/>
				</Item>

				<Result>{`할인이 적용된 가격은 ${priceToString(
					price - discount
				)}원입니다.`}</Result>
				<Buttons>
					<Button border onClick={selectNo}>
						취소
					</Button>
					<Button filled active={check} onClick={selectYes}>
						저장
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default OptionModal;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 41.1rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 10vh;
	left: 50%;
	transform: translate(-50%, 50%);
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Text = styled.p`
	height: 5.6rem;
	line-height: 2.8rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
`;
const Item = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.6rem;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const Title = styled.div`
	width: 6.7rem;
	height: 1.7rem;
	line-height: 1.7rem;
	text-align: left;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Input = styled.input`
	width: 22rem;
	height: 3.1rem;
	line-height: 3.1rem;
	border: 2px solid #e5e6ed;
	font-size: 1.2rem;
	letter-spacing: -0.24px;
`;
const Result = styled.p`
	margin-top: 2.3rem;
	margin-bottom: 5rem;
	font-size: 1.2rem;
	color: #7f8697;
`;
const Buttons = styled.div`
	display: flex;
	align-items: center;
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
	${(props) => props.filled && !props.active && `opacity:0.4`}
	${(props) =>
		props.border &&
		`margin-right:0.8rem; border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
`;
