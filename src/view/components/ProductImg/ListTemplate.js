import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMG_ADDRESS } from '../../../config';
import * as toggleMenu from '../../../model/toggle';
import * as productImgController from '../../../controller/product_img';
import styled from 'styled-components';
import down from '../../../images/angle_down.svg';
import left from '../../../images/left.svg';
import right from '../../../images/right.svg';
import toggle from '../../../images/toggle.svg';
import Spinner from '../Common/Spinner';

const ListTemplate = (props) => {
	const navigate = useNavigate();
	const menuSelect = useRef();
	const viewListBox = useRef();
	const viewList = ['전체보기', '단일 이미지', '공유 이미지'];
	const [isLoading, setIsLoading] = useState(false);
	const [view, setView] = useState('전체보기');
	const [viewOpen, setViewOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState('close');
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		productImgController.getList().then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.product_image_list);
			}
		});
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, []);

	const viewSelectController = (e) => {
		const innerText = e.target.innerText;
		innerText !== view && setView(innerText);
		setViewOpen(false);
	};

	useEffect(() => {
		let isSubscribed = true;
		if (view === '전체보기') {
			productImgController.getList().then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.product_image_list);
				}
			});
		} else if (view === '단일 이미지') {
			productImgController.getShareList(false).then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.product_image_list);
				}
			});
		} else if (view === '공유 이미지') {
			productImgController.getShareList(true).then((res) => {
				if (isSubscribed && res.data.success) {
					setList(res.data.product_image_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [view]);

	const goDetail = (el) => {
		navigate('', { state: el.product_image_id });
		props.setMode('detail');
	};
	const selectMenuController = (menu, el) => {
		if (menu === '수정하기') {
			selectEdit(el);
		} else if (menu === '타입변경') {
			selectShare(el);
		} else if (menu === '삭제하기') {
			selectDelete(el);
		}
		setDetail(el);
		setMenuOpen('close');
	};
	const selectEdit = (el) => {
		navigate('', { state: el.product_image_id });
		props.setMode('edit');
	};
	const selectShare = (detail) => {
		if (detail.share === 1 && detail.used > 1) {
			props.setModal({
				type: 'confirm',
				text: '해당 상세이미지는\n공유된 상품이 2개 이상입니다.\n목록이전을 먼저 해주세요.',
			});
		} else {
			props.setModal({
				type: 'select',
				text: '타입(공유여부)을\n변경하시겠습니까?',
				act: 'share',
			});
		}
	};
	const selectDelete = (detail) => {
		if (detail.share === 1) {
			props.setModal({
				type: 'confirm',
				text: '공유이미지는\n삭제할 수 없습니다.',
			});
		} else {
			props.setModal({
				type: 'select',
				text: '해당 이미지를\n삭제하시겠습니까?',
				act: 'delete',
			});
		}
	};

	const onMouseDown = (e) => {
		menuOpen !== 'close' &&
			(!menuSelect.current || !menuSelect.current.contains(e.target)) &&
			setMenuOpen('close');
		viewOpen &&
			(!viewListBox.current || !viewListBox.current.contains(e.target)) &&
			setViewOpen(false);
	};

	const leftClick = (e) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i] === e) {
				if (list[i - 1]) {
					arr = [list[i - 1], list[i]];
					break;
				}
			}
		}
		changeOrder(arr);
	};
	const rightClick = (e) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i] === e) {
				arr = [list[i], list[i + 1]];
				break;
			}
		}
		changeOrder(arr);
	};

	const changeOrder = (arr) => {
		if (arr[0] && arr[1]) {
			let _view = viewChange(view);
			productImgController.changeOrder(arr, _view).then((res) => {
				res.data.success && setList(res.data.product_image_list);
			});
		}
	};
	const viewChange = (view) => {
		if (view === '전체보기') {
			return 2;
		} else if (view === '단일 이미지') {
			return 0;
		} else if (view === '공유 이미지') {
			return 1;
		}
	};

	useEffect(() => {
		let isSubscribed = true;
		let modal = props.modal;
		if (modal.act === 'share' && modal.return) {
			productImgController
				.changeShare(detail.product_image_id)
				.then((res) => {
					isSubscribed &&
						res.data.success &&
						success(res.data.product_image_list);
				});
		} else if (modal.act === 'delete' && modal.return) {
			productImgController.remove(detail.product_image_id).then((res) => {
				isSubscribed &&
					res.data.success &&
					success(res.data.product_image_list);
			});
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, [props.modal.type]);

	const success = (list) => {
		setView('전체보기');
		setList(list);
		props.setModal({ type: '' });
	};

	return (
		<Container onMouseDown={onMouseDown}>
			{isLoading && <Spinner />}
			<Wrap>
				{list.map((el, idx) => (
					<List key={idx}>
						<ListImgWrap
							display={el.display}
							onClick={() => goDetail(el)}>
							{el.share === 1 && (
								<ListState className='share'>Share Image</ListState>
							)}
							{el.temp_image && (
								<ListImg
									alt='product img'
									src={`${IMG_ADDRESS}/${el.temp_image}`}
								/>
							)}
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
										setMenuOpen(idx);
									}}
								/>
								{menuOpen === idx && (
									<ToggleMenus ref={menuSelect}>
										{toggleMenu.product_img.map((item, idx) => (
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
			<Item>
				{viewOpen === false ? (
					<ItemSelected
						onClick={() => {
							setViewOpen(true);
						}}>
						<ItemText>{view}</ItemText>
						<ItemSelectImg alt='select button' src={down} />
					</ItemSelected>
				) : (
					<ItemSelectWrap ref={viewListBox}>
						<ItemSelectList
							onClick={() => {
								setViewOpen(false);
							}}>
							{view}
						</ItemSelectList>
						{viewList.map((el, idx) => (
							<ItemSelectList key={idx} onClick={viewSelectController}>
								{el}
							</ItemSelectList>
						))}
					</ItemSelectWrap>
				)}
			</Item>
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
	min-height: 78.9rem;
	position: relative;
`;
const Wrap = styled.ul`
	margin-top: 4.85rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	position: relative;
`;
const List = styled.li`
	width: 37.4rem;
	height: 21.3rem;
	margin: auto;
	margin-bottom: 8.3rem;
`;
const ListImgWrap = styled.div`
	width: 37.4rem;
	height: 16.9rem;
	overflow-y: hidden;
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
	&:hover .share {
		background-color: #5887ff;
	}
	${(props) => props.display && `background-color:#2A3349`}
`;
const ListState = styled.p`
	width: 21rem;
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
	position: absolute;
	right: 0;
	background-color: #fff;
	box-shadow: 0px 3px 15px #00000040;
	border-radius: 4px;
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
const Item = styled.div`
	width: 16rem;
	padding-bottom: 3.1rem;
	display: flex;
	justify-content: center;
	position: absolute;
	top: -5.75rem;
	right: 0;
`;
const ItemSelected = styled.div`
	margin-bottom: 1rem;
	width: 16rem;
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
	width: 16rem;
	height: 12.4rem;
	line-height: 3.2rem;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: auto;
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
