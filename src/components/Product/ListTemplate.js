import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as category from '../../data/link';
import * as toggleMenu from '../../data/toggle';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';
import example from '../../images/banner1.png';

const ListTemplate = () => {
	const history = useHistory();
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState(false);

	const partBox = useRef();
	const subPartBox = useRef();
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('과일/수입청과');
	const [partList, setPartList] = useState(category.part);
	const [subPartList, setSubPartList] = useState([]);
	const [partOpen, setPartOpen] = useState(0);
	// const [list, setList] = useState([]);
	const list = new Array(18).fill({
		product_id: 1,
		product_image_id: 1,
		supplier_id: 1,
		part: '축산',
		subPart: '한우',
		title: '횡성한우',
		text: '질좋은 횡성한우',
		storage: '-10℃~2℃ 냉장보관',
		origin: '대한민국',
		recommend: false,
		thumbnail: 'uploads/product/124512512.png',
		state: 'O',
		product_image_title: '횡성한우 대표 이미지',
		detail_image: 'uploads/product/1325412512.png',
		supplier_name: '대우축산',
		supplier_owner: '김대우',
		supplier_business_number: '275-111-1111111',
		supplier_address: '경기도 시흥시 신천동 12-12',
		supplier_tel: '010-1212-1212',
		supplier_manager_name: '박축산',
		supplier_manager_tel: '010-3333-3333',
		options: 3,
	});

	const goDetail = (el) => {
		console.log(el);
	};
	const menuOpenController = (e) => {
		setMenuOpen(e);
	};
	const selectMenuController = () => {};
	const leftClick = () => {};
	const rightClick = () => {};

	const partController = (e) => {
		if (part !== e.target.innerText) {
			setPart(e.target.innerText);
		}
		setPartOpen(0);
	};
	const subPartController = (e) => {
		if (subPart !== e.target.innerText) {
			setSubPart(e.target.innerText);
		}
		setPartOpen(0);
	};

	useEffect(() => {
		for (let i = 0; i < category.part.length; i++) {
			if (part === category.part[i].title) {
				setSubPart(category.part[i].arr[0]);
				return setSubPartList(category.part[i].arr);
			}
		}
	}, [part]);

	const onMouseDown = (e) => {
		if (
			partOpen &&
			(!partBox.current || !partBox.current.contains(e.target)) &&
			(!subPartBox.current || !subPartBox.current.contains(e.target))
		) {
			setPartOpen(0);
		}
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap>
				{list.map((el, idx) => (
					<List key={idx}>
						<ListImgWrap
							display={el.display}
							onClick={() => goDetail(el)}>
							{el.share === 1 && (
								<ListState className='share'>Share Image</ListState>
							)}
							<ListImg
								alt='product img'
								src={`${IMG_ADDRESS}/${el.image}`}
							/>
						</ListImgWrap>
						<ListBottom>
							<ListTitle
								onClick={() => {
									goDetail(el);
								}}>
								{el.title}
							</ListTitle>
							<ListButtons>
								<ListButton
									alt='button'
									src={left}
									onClick={() => {
										leftClick(el);
									}}
								/>
								<ListButton
									alt='button'
									src={right}
									onClick={() => {
										rightClick(el);
									}}
								/>
								<ListButton
									alt='button'
									src={toggle}
									onClick={() => {
										menuOpenController(idx);
									}}
								/>
								{menuOpen === idx && (
									<ToggleMenus ref={menuSelect}>
										{toggleMenu.product.map((item, idx) => (
											<ToggleMenu
												key={idx}
												onClick={() => {
													selectMenuController(item, el);
												}}>
												{item}
											</ToggleMenu>
										))}
									</ToggleMenus>
								)}
							</ListButtons>
						</ListBottom>
					</List>
				))}
			</Wrap>
			<Items>
				<Item>
					{partOpen === 1 ? (
						<ItemSelectWrap ref={partBox}>
							<ItemSelectList>{part && `${part}`}</ItemSelectList>
							{partList.map((el, idx) => (
								<ItemSelectList key={idx} onClick={partController}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					) : (
						<ItemSelected
							onClick={() => {
								setPartOpen(1);
							}}>
							<ItemText>{part && `대분류 · ${part}`}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					)}
				</Item>
				<Item>
					{partOpen === 2 ? (
						<ItemSelectWrap ref={subPartBox}>
							<ItemSelectList>{subPart && `${subPart}`}</ItemSelectList>
							{subPartList.map((el, idx) => (
								<ItemSelectList key={idx} onClick={subPartController}>
									{el}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					) : (
						<ItemSelected
							onClick={() => {
								setPartOpen(2);
							}}>
							<ItemText>{subPart && `소분류 · ${subPart}`}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					)}
				</Item>
			</Items>
		</Container>
	);
};

export default withRouter(ListTemplate);

const Container = styled.div`
	width: 119rem;
	min-height: 78.9rem;
	position: relative;
`;
const Wrap = styled.ul`
	margin-top: 4.85rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
`;
const List = styled.li`
	width: 18.3rem;
	height: 18.8rem;
	margin: auto;
	margin-bottom: 8rem;
`;
const ListImgWrap = styled.div`
	width: 100%;
	height: 16.9rem !important;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.3rem;
	position: relative;
	border-radius: 4px;
	background-color: #e5e6ed;
	&:hover {
		background-color: #5887ff;
	}
	&:hover .display {
		background-color: #5887ff;
	}
	${(props) => (props.main ? `height:16.9rem` : `height:11.3rem`)}
	${(props) => props.display && `background-color:#2A3349`}
`;
const ListState = styled.p`
	width: 12rem;
	height: 2.3rem;
	line-height: 2.3rem;
	font-size: 1.4rem;
	font-family: 'kr-b';
	color: #fff;
	text-align: center;
	position: absolute;
	top: 0;
	border-radius: 0px 0px 4px 4px;
	background-color: #2a3349;
`;
const ListImg = styled.img`
	width: 100%;
	height: 100%;
	cursor: pointer;
`;
const ListBottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ListTitle = styled.p`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #5e667b;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
`;
const ListButtons = styled.div`
	display: flex;
	position: relative;
`;
const ListButton = styled.img`
	width: 0.9rem;
	height: 1.3rem;
	margin-left: 0.6rem;
	cursor: pointer;
	:nth-child(1) {
		margin: 0;
	}
`;
const ToggleMenus = styled.ul`
	width: 8.9rem;
	height: 11.2rem;
	position: absolute;
	right: 0;
	background-color: #fff;
	box-shadow: 0px 3px 15px #00000040;
	border-radius: 4px;
	z-index: 3;
`;
const ToggleMenu = styled.li`
	height: 2.8rem;
	line-height: 2.8rem;
	font-size: 1.2rem;
	color: #5e667b;
	text-align: center;
	cursor: pointer;
	:hover {
		background-color: #e5e6ed;
	}
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
