import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const BannerList = (props) => {
	const modalBox = useRef();
	const [list, setList] = useState([]);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setList(props.modal.list);
	}, [props.modal.list]);

	const selectItem = (e) => {
		setSelected(e);
	};
	const selectYes = () => {
		props.setModal({
			...props.modal,
			type: '',
			act: 'replace',
			return: selected,
		});
	};
	const selectNo = () => {
		props.setModal({ ...props.modal, type: '' });
	};

	const onMouseDown = (e) => {
		props.modal.type !== '' &&
			(!modalBox.current || !modalBox.current.contains(e.target)) &&
			props.setModal({ type: '' });
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap ref={modalBox}>
				<Text>{props.modal.text}</Text>
				<Items>
					{list.map((el, idx) => (
						<Item
							key={idx}
							selected={selected === idx}
							onClick={() => {
								selectItem(idx);
							}}>
							{el.title}
						</Item>
					))}
				</Items>
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

export default BannerList;

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
	height: 5.6rem;
	line-height: 2.8rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
	text-align: center;
`;
const Items = styled.ul`
	width: 100%;
	height: 13.2rem;
	margin-top: 4.1rem;
	margin-bottom: 5rem;
`;
const Item = styled.li`
	width: 100%;
	height: 4.4rem;
	line-height: 4.4rem;
	font-size: 1.6rem;
	font-family: 'kr-r';
	text-align: center;
	cursor: pointer;
	${(props) =>
		props.selected ? `font-family:'kr-b'; color:#5887FF; ` : `color:#848CA2`}
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
