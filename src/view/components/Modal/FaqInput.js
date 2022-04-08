import React, { useEffect, useMemo, useRef, useState } from 'react';
import { faqCategory } from '../../../model/category';
import styled from 'styled-components';
import down from '../../../images/angle-down.svg';

const FaqInputModal = (props) => {
	const typeBox = useRef();
	const [typeOpen, setTypeOpen] = useState(false);
	const [type, setType] = useState(1);
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const qna = ['질문', '답변'];
	const types = useMemo(() => {
		let arr = [];
		faqCategory.forEach((el) => {
			arr.push(el.item);
		});
		return arr;
	}, []);

	useEffect(() => {
		if (props.modal.data) {
			const modalData = props.modal.data;
			setType(modalData.qu_type_id);
			setQuestion(modalData.qu_title);
			setAnswer(modalData.qu_text);
		}
	}, [props.modal.data]);

	const onChangeType = (idx) => {
		setType(idx + 1);
		setTypeOpen(false);
	};
	const onChangeQuestion = (e) => {
		setQuestion(e.target.value);
	};
	const onChangeAnswer = (e) => {
		setAnswer(e.target.value);
	};

	const onCancel = () => {
		props.setModal({ type: '' });
	};
	const onSubmit = () => {
		props.setModal({
			...props.modal,
			type: '',
			qu_id: props.modal.qu_id ? props.modal.qu_id : null,
			return: {
				qu_type_id: type,
				qu_title: question,
				qu_text: answer,
			},
		});
	};

	const onMouseDown = (e) => {
		typeOpen &&
			(!typeBox.current || !typeBox.current.contains(e.target)) &&
			setTypeOpen(false);
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap>
				<Text>
					{`FAQ ${props.modal.act === 'create' ? '추가' : '수정'}하기`}
				</Text>
				<Content>
					<Left>
						<Title>타입</Title>
					</Left>
					<Right>
						{typeOpen ? (
							<ItemSelectWrap ref={typeBox}>
								<ItemSelectList>{types[type - 1]}</ItemSelectList>
								{types.map((el, idx) => (
									<ItemSelectList
										key={idx}
										onClick={() => {
											onChangeType(idx);
										}}>
										{el}
									</ItemSelectList>
								))}
							</ItemSelectWrap>
						) : (
							<ItemSelected
								onClick={() => {
									setTypeOpen(true);
								}}>
								<ItemText>{types[type - 1]}</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
					</Right>
				</Content>
				{qna.map((el, idx) => (
					<Content key={idx}>
						<Left>
							<Title>{el}</Title>
						</Left>
						<Right>
							<Input
								value={
									idx === 0 && question
										? question
										: idx === 1 && answer
										? answer
										: ''
								}
								type='textarea'
								placeholder='내용을 입력해주세요.'
								onChange={idx === 0 ? onChangeQuestion : onChangeAnswer}
							/>
						</Right>
					</Content>
				))}
				<Buttons>
					<Button border onClick={onCancel}>
						취소
					</Button>
					<Button filled active={question && answer} onClick={onSubmit}>
						저장
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default FaqInputModal;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Wrap = styled.div`
	width: 53.7rem;
	padding: 3.2rem 6rem 4.8rem 6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	margin-bottom: 3rem;
`;
const Content = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	:nth-child(2) {
		height: 3.1rem;
	}
	:nth-child(3),
	:nth-child(4) {
		height: 6.2rem;
	}
	:nth-child(4) {
		margin: 0;
	}
`;
const Left = styled.div`
	width: 4.2rem;
	height: 100%;
	display: flex;
	align-items: center;
`;
const Title = styled.p`
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Right = styled.div`
	width: 37.5rem;
	height: 100%;
	position: relative;
`;
const ItemSelected = styled.div`
	width: 12rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
	position: absolute;
`;
const ItemText = styled.p`
	width: 100%;
	font-size: 1.2rem;
	color: #7f8697;
`;
const ItemSelectImg = styled.img`
	width: 0.7rem;
	height: 0.6rem;
	position: absolute;
	right: 1rem;
`;
const ItemSelectWrap = styled.ul`
	width: 12rem;
	max-height: 12.4rem;
	line-height: 3.1rem;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: auto;
`;
const ItemSelectList = styled.li`
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
const Input = styled.textarea`
	width: 100%;
	height: 100%;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #7f8697;
	letter-spacing: -0.24px;
	::placeholder {
		color: #7f8697;
	}
`;
const Buttons = styled.div`
	display: flex;
	align-items: center;
	margin-top: 3.2rem;
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
	${(props) =>
		props.border &&
		`margin-right:0.8rem; border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
	${(props) => props.filled && !props.active && `opacity:0.4`}
`;
