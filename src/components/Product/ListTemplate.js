import React, { useEffect, useRef, useState } from 'react';
import * as category from '../../data/product_part';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const ListTemplate = () => {
	const partBox = useRef();
	const subPartBox = useRef();
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('');
	const [partList, setPartList] = useState([]);
	const [subPartList, setSubPartList] = useState([]);
	const [openSelect, setOpenSelect] = useState(0);

	const partController = () => {};
	const subPartController = () => {};

	return (
		<Container>
			<Items>
				<Item>
					{openSelect !== 1 ? (
						<ItemSelected
							onClick={() => {
								setOpenSelect(1);
							}}>
							<ItemText>{part && `대분류·${part}`}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={partBox}>
							<ItemSelectList
								onClick={() => {
									setOpenSelect(0);
								}}>
								{part && `대분류·${part}`}
							</ItemSelectList>
							{partList.map((el, idx) => (
								<ItemSelectList
									key={idx}
									onClick={() => {
										partController(idx);
									}}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item>
					{openSelect !== 2 ? (
						<ItemSelected
							onClick={() => {
								setOpenSelect(2);
							}}>
							<ItemText>{subPart && `소분류·${subPart}`}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={subPartBox}>
							<ItemSelectList
								onClick={() => {
									setOpenSelect(0);
								}}>
								{subPart && `소분류·${subPart}`}
							</ItemSelectList>
							{subPartList.map((el, idx) => (
								<ItemSelectList
									key={idx}
									onClick={() => {
										subPartController(idx);
									}}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
			</Items>
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
	min-height: 78.9rem;
	position: relative;
`;
const Items = styled.div`
	width: 33rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
	position: absolute;
	top: -5.75rem;
	right: 0;
`;
const Item = styled.div`
	position: relative;
	:nth-child(1) {
		margin-right: 1rem;
	}
	/* ${(props) => (props.active ? `opacity:1` : `opacity:0.4`)}; */
`;
const ItemSelected = styled.div`
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
	width: 16rem;
	height: 16rem;
	line-height: 3.2rem;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: scroll;
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
