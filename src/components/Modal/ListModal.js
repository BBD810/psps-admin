import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ListModal = (props) => {
	const modalBox = useRef();
	const [list, setList] = useState([]);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setList(props.modal.list);
	}, []);

	const selectItem = (e) => {
		setSelected(e);
	};
	const onSubmit = () => {
		props.modalController({ type: '', act: 'replace', return: selected });
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
				<Button onClick={onSubmit}>확인</Button>
			</Wrap>
		</Container>
	);
};

export default ListModal;

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
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
