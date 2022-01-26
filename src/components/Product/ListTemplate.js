import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS, CLIENT_ADDRESS } from '../../config';
import * as _product from '../../controller/product';
import * as category from '../../data/link';
import * as toggleMenu from '../../data/toggle';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';
import example from '../../images/banner1.png';
import Spinner from '../Spinner';

const ListTemplate = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const menuBox = useRef();
	const [menuOpen, setMenuOpen] = useState('close');

	const partBox = useRef();
	const subPartBox = useRef();
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('과일·수입청과');
	const [partList, setPartList] = useState(category.part);
	const [subPartList, setSubPartList] = useState([]);
	const [partOpen, setPartOpen] = useState(0);
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);

	console.log(list);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		if (props.category === '상품 목록') {
			_product.get_list(part, subPart).then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.product_list);
					setIsLoading(false);
				}
			});
		} else if (props.category === '추천 상품 목록') {
			_product.get_recommend_list().then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.product_recommend_list);
					setIsLoading(false);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [part, subPart, props.category]);

	useEffect(() => {
		for (let i = 0; i < category.part.length; i++) {
			if (part === category.part[i].title) {
				setSubPart(category.part[i].arr[0]);
				return setSubPartList(category.part[i].arr);
			}
		}
	}, [part]);

	const goDetail = (el) => {
		history.push({ state: el.product_id });
		props.changeMode('detail');
	};
	const menuOpenController = (idx) => {
		setMenuOpen(idx);
	};
	const selectMenuController = (menu, el) => {
		if (menu === '수정하기') {
			selectEdit(el);
		} else if (menu === '노출변경') {
			selectDisplay(el);
		} else if (menu === '삭제하기') {
			selectDelete(el);
		} else if (menu === '링크확인') {
			selectLink(el);
		}
		setDetail(el);
		setMenuOpen('close');
	};
	const selectEdit = (el) => {
		history.push({ state: el });
		props.changeMode('edit');
	};
	const selectDisplay = (el) => {
		if (el.recommend) {
			props.modalController({
				type: 'confirm',
				text: '추천상품은\n노출상태를 변경할 수 없습니다.',
			});
		} else {
			_product.change_display(el.product_id).then((res) => {
				if (res.data.success) {
					setList(res.data.product_list);
					props.modalController({
						type: 'confirm',
						text: '변경되었습니다.',
					});
				} else {
					props.modalController({
						type: 'confirm',
						text: '상품의 노출상태를 변경하려면\n최소 1개의 옵션이 노출상태여야 합니다.',
					});
				}
			});
		}
	};
	const goDisplay = () => {};
	const selectDelete = (el) => {
		if (el.recommend) {
			props.modalController({
				type: 'confirm',
				text: '추천상품은\n삭제할 수 없습니다.',
			});
		} else {
			props.modalController({
				type: 'select',
				text: '해당 상품을\n삭제하시겠습니까?',
				act: 'delete',
			});
		}
	};
	const selectLink = (el) => {
		let link = `/detail/${el.product_id}`;
		window.open(`${CLIENT_ADDRESS}${link}`, '_blank');
	};

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

	const onMouseDown = (e) => {
		if (
			partOpen &&
			(!partBox.current || !partBox.current.contains(e.target)) &&
			(!subPartBox.current || !subPartBox.current.contains(e.target))
		) {
			setPartOpen(0);
		}
		if (
			menuOpen &&
			(!menuBox.current || !menuBox.current.contains(e.target))
		) {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		let isSubscribed = true;
		let _modal = props.modal;
		if (_modal.act === 'display' && _modal.return) {
		} else if (_modal.act === 'delete' && _modal.return) {
			_product.remove(detail.product_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.product_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.modal.type]);
	const success = (list) => {
		setList(list);
		props.modalController({ type: '' });
	};

	return (
		<Container onMouseDown={onMouseDown}>
			{isLoading && <Spinner />}
			<Wrap>
				{list.map((el, idx) => (
					<List key={idx} active={el.state === 'O'}>
						<ListImgWrap onClick={() => goDetail(el)}>
							{el.stock === 0 && (
								<ListState className='sold_out'>Sold Out</ListState>
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
									<ToggleMenus ref={menuBox}>
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
			{props.category === '상품 목록' && (
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
								<ItemText>{part && `대분류 - ${part}`}</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
					</Item>
					<Item>
						{partOpen === 2 ? (
							<ItemSelectWrap ref={subPartBox}>
								<ItemSelectList>
									{subPart && `${subPart}`}
								</ItemSelectList>
								{subPartList.map((el, idx) => (
									<ItemSelectList
										key={idx}
										onClick={subPartController}>
										{el}
									</ItemSelectList>
								))}
							</ItemSelectWrap>
						) : (
							<ItemSelected
								onClick={() => {
									setPartOpen(2);
								}}>
								<ItemText>{subPart && `소분류 - ${subPart}`}</ItemText>
								<ItemSelectImg alt='select button' src={down} />
							</ItemSelected>
						)}
					</Item>
				</Items>
			)}
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
	${(props) => !props.active && `opacity:0.4`}
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
	background-color: #2a3349;
	&:hover {
		background-color: #5887ff;
	}
	&:hover .sold_out {
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
	top: 0.3rem;
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
	width: 100%;
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
	max-height: 16rem;
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
