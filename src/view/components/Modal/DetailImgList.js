import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as productImgController from '../../../controller/product_img';
import styled from 'styled-components';
import down from '../../../images/angle_down.svg';

const DetailImgListModal = (props) => {
	const history = useHistory();
	const modalBox = useRef();
	const shareBox = useRef();
	const singleBox = useRef();
	const [listOpen, setListOpen] = useState(false);
	const [shareList, setShareList] = useState([]);
	const [singleList, setSingleList] = useState([]);
	const [shareSelected, setShareSelected] = useState(false);
	const [singleSelected, setSingleSelected] = useState(false);

	useEffect(() => {
		let isSubscribed = true;
		productImgController
			.getShareList(true)
			.then((res) => {
				isSubscribed &&
					res.data.success &&
					setShareList(res.data.product_image_list);
			})
			.then(
				productImgController.getUnusedSingleList(false).then((res) => {
					isSubscribed &&
						res.data.success &&
						setSingleList(res.data.product_image_list);
				})
			);
		return () => {
			isSubscribed = false;
		};
	}, []);

	const shareSelect = (el) => {
		setShareSelected(el);
		setSingleSelected(false);
		setListOpen(false);
	};
	const singleSelect = (el) => {
		setSingleSelected(el);
		setShareSelected(false);
		setListOpen(false);
	};
	const selectYes = () => {
		let value;
		if (!shareSelected && !singleSelected) {
			return;
		} else {
			shareSelected
				? (value = shareSelected.product_image_id)
				: (value = singleSelected.product_image_id);
		}
		history.push({ state: value });
		props.setModal({ type: '' });
	};
	const selectNo = () => {
		props.setModal({ ...props.modal, type: '' });
	};
	const selectCreate = () => {
		props.setModal({ ...props.modal, type: 'img_create' });
	};

	const onMouseDown = (e) => {
		listOpen &&
			(!shareBox.current || !shareBox.current.contains(e.target)) &&
			(!singleBox.current || !singleBox.current.contains(e.target)) &&
			setListOpen(false);
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap ref={modalBox}>
				<Text>{props.modal.text}</Text>
				<Desc>공유이미지-단일이미지 순으로 나열됩니다.</Desc>
				<Items>
					<Item>
						{listOpen === 1 ? (
							<ItemSelectWrap main={true} ref={shareBox}>
								<ItemSelectList>
									{shareSelected
										? shareSelected.title
										: '공유 이미지 선택'}
								</ItemSelectList>
								{shareList.map((el, idx) => (
									<ItemSelectList
										key={idx}
										onClick={() => {
											shareSelect(el);
										}}>
										{el.title}
									</ItemSelectList>
								))}
							</ItemSelectWrap>
						) : (
							<ItemSelected
								main={true}
								onClick={() => {
									setListOpen(1);
								}}>
								<ItemText>
									{shareSelected
										? shareSelected.title
										: '공유 이미지 선택'}
								</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
					</Item>

					<Item>
						{listOpen === 2 ? (
							<ItemSelectWrap sub={true} ref={singleBox}>
								<ItemSelectList>
									{singleSelected
										? singleSelected.title
										: '단일 이미지 선택'}
								</ItemSelectList>
								{singleList.map((el, idx) => (
									<ItemSelectList
										key={idx}
										onClick={() => {
											singleSelect(el);
										}}>
										{el.title}
									</ItemSelectList>
								))}
							</ItemSelectWrap>
						) : (
							<ItemSelected
								sub={true}
								onClick={() => {
									setListOpen(2);
								}}>
								<ItemText>
									{singleSelected
										? singleSelected.title
										: '단일 이미지 선택'}
								</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
					</Item>
				</Items>

				<Buttons>
					<Button border onClick={selectNo}>
						취소
					</Button>
					<Button active filled onClick={selectCreate}>
						이미지 추가
					</Button>
					<Button
						active={shareSelected || singleSelected}
						filled
						onClick={selectYes}>
						확인
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default DetailImgListModal;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 30;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Wrap = styled.div`
	width: 41.1rem;
	height: 39rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 10;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Text = styled.p`
	margin-bottom: 1rem;
	height: 2.9rem;
	line-height: 2.8rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
`;
const Desc = styled.p`
	margin-bottom: 4.1rem;
	font-size: 1.2rem;
	color: #5e667b;
`;
const Items = styled.div`
	width: 41.1rem;
	height: 8.2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 6rem;
`;
const Item = styled.div`
	width: 20rem;
	position: relative;
	:nth-child(1) {
		margin-bottom: 4.1rem;
	}
`;
const ItemSelected = styled.div`
	width: 20rem;
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
	top: -1rem;
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
	width: 20rem;
	max-height: 16rem;
	line-height: 3.1rem;
	position: absolute;
	top: -1rem;
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
	${(props) =>
		props.border &&
		`border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
	${(props) => props.filled && `margin-left:0.8rem;`}
	 ${(props) => props.filled && !props.active && `background-color:#aaadb6`}
`;
