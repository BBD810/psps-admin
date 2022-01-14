import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const ListModal2 = (props) => {
	const modalBox = useRef();
	const listBox = useRef();
	const [list, setList] = useState([]);
	const [selected, setSelected] = useState('');
	const [openSelect, setOpenSelect] = useState(false);

	useEffect(() => {
		setList(props.modal.list);
	}, []);

	const selectController = (idx) => {
		setSelected(idx);
		setOpenSelect(0);
	};
	const selectYes = () => {
		props.modalController({
			type: '',
			act: 'replace',
			return: selected,
		});
	};
	const selectNo = () => {
		props.modalController({ ...props.modal, type: '' });
	};

	const onClick = () => {
		setOpenSelect(0);
	};

	const onMouseDown = (e) => {
		if (
			props.modal.type !== '' &&
			(!modalBox.current || !modalBox.current.contains(e.target))
		) {
			props.modalController({ type: '' });
		}
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap ref={modalBox}>
				<Text>{props.modal.text}</Text>
				<Desc>{props.modal.desc}</Desc>
				<Item>
					{openSelect !== 1 ? (
						<ItemSelected
							onClick={() => {
								setOpenSelect(1);
							}}>
							<ItemText>
								{selected === ''
									? '선택해주세요.'
									: list[selected].title}
							</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={listBox}>
							<ItemSelectList onClick={onClick}>
								{selected === ''
									? '선택해주세요.'
									: list[selected].title}
							</ItemSelectList>
							{list.map((el, idx) => (
								<ItemSelectList
									key={idx}
									onClick={() => {
										selectController(idx);
									}}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>

				<Buttons>
					<Button border onClick={selectNo}>
						취소
					</Button>
					<Button filled onClick={selectYes}>
						확인
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default ListModal2;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;
const Wrap = styled.div`
	width: 41.1rem;
	height: 39rem;
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
const Desc = styled.p`
	font-size: 1.2rem;
	color: #5e667b;
	margin-top: 1rem;
	margin-bottom: 4.1rem;
`;
const Item = styled.div`
	width: 100%;
	padding-bottom: 3.1rem;
	margin-bottom: 1rem;
	margin-bottom: 6rem;
	display: flex;
	justify-content: center;
	position: relative;
`;
const ItemSelected = styled.div`
	margin-bottom: 1rem;
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	position: absolute;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
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
	height: 16rem;
	line-height: 3.2rem;
	position: absolute;
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
const ItemSelectList = styled.li`
	height: 3.2rem;
	line-height: 3.2rem;
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
		`margin-right:0.8rem; border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
`;
