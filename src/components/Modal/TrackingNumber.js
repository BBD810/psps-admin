import React, { useEffect, useRef, useState } from 'react';
import * as _courier from '../../controller/courier';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const TrackingNumberModal = (props) => {
	const companyBox = useRef();
	const [listOpen, setListOpen] = useState(false);
	const [list, setList] = useState([]);
	const [cou, setCou] = useState({ name: '', id: '', num: '' });

	const onChangeCou = (e) => {
		setCou({ ...cou, name: e.cou_name, id: e.cou_id });
	};
	const onChangeCou_num = (e) => {
		setCou({ ...cou, num: e.target.value });
	};

	const selectSave = () => {
		if (!cou.num) {
			return alert('운송장 번호를 입력해주세요.');
		} else if (!cou.name) {
			return alert('택배사를 입력해주세요.');
		} else {
			return props.setModal({ ...props.modal, act: '', return: cou });
		}
	};
	const selectCancel = () => {
		props.setModal({ ...props.modal, act: '' });
	};

	useEffect(() => {
		let isSubscribed = true;
		if (list.length < 1) {
			_courier.get_list().then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.courier_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [list]);

	return (
		<Container>
			<Wrap ref={companyBox}>
				<Text>송장 발송하기</Text>
				<Content>
					<Item>
						{listOpen ? (
							<ItemSelectWrap
								ref={companyBox}
								onClick={() => {
									setListOpen(!listOpen);
								}}>
								<ItemSelectList>
									{cou.name ? cou.name : `택배사`}
								</ItemSelectList>
								{list.map((el, idx) => (
									<ItemSelectList
										key={idx}
										onClick={() => {
											onChangeCou(el);
										}}>
										{el.cou_name}
									</ItemSelectList>
								))}
							</ItemSelectWrap>
						) : (
							<ItemSelected
								onClick={() => {
									setListOpen(!listOpen);
								}}>
								<ItemText>{cou.name ? cou.name : '택배사'}</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
						<Input
							type='number'
							placeholder={'숫자만 입력해주세요.'}
							onChange={onChangeCou_num}
						/>
					</Item>
				</Content>
				<Buttons>
					<Button border onClick={selectCancel}>
						취소하기
					</Button>
					<Button filled onClick={selectSave}>
						저장하기
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default TrackingNumberModal;

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
	width: 43.3rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 20;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Text = styled.p`
	height: 2.9rem;
	line-height: 2.9rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
	margin-bottom: 5rem;
`;
const Content = styled.div`
	display: flex;
`;

const Item = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	:nth-child(1) {
		margin-right: 1rem;
	}
`;
const ItemSelected = styled.div`
	width: 10.6rem;
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
	top: 0;
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
	width: 10.6rem;
	max-height: 12.4rem;
	line-height: 3.1rem;
	position: absolute;
	top: 0;
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
const Input = styled.input`
	width: 19.2rem;
	height: 3.1rem;
	line-height: 3.1rem;
	margin-left: 11rem;
	font-size: 1.2rem;
	color: #7f8697;
`;
const Buttons = styled.div`
	margin-top: 4.2rem;
	display: flex;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	${(props) =>
		props.border
			? `color:#2a3349;
			background-color:unset;
			border:2px solid #2a3349;`
			: `color: #fff; 
			background-color: #2a3349;
			margin-left:1rem;
			`}
`;
