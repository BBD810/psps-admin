import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS, ADDRESS } from '../../config';
import * as toggleMenu from '../../data/toggle';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';

const ListTemplate = (props) => {
	const history = useHistory();
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState('close');
	const [product_image_id, setProduct_image_id] = useState('');
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);
	const [shareList, setShareList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		product_img.get_list().then((res) => {
			if (isSubscribed && res.data.success) {
				console.log(res.data);
				setList(res.data.product_image_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);
	useEffect(() => {
		let isSubscribed = true;
		product_img.get_share_list(true).then((res) => {
			setShareList(res.data.product_image_list);
		});
		return () => {
			isSubscribed = false;
		};
	}, [list]);

	const goDetail = (el) => {
		history.push({ state: el.product_image_id });
		props.changeMode('detail');
	};
	const menuOpenController = (idx) => {
		setMenuOpen(idx);
	};
	const selectMenuController = (menu, el) => {
		if (menu === '수정하기') {
			selectEdit(el);
		} else if (menu === '타입변경') {
			selectShare(el);
		} else if (menu === '삭제하기') {
			selectDelete(el);
		}
		setProduct_image_id(el.product_image_id);
		setDetail(el);
		setMenuOpen('close');
	};
	const selectEdit = (el) => {
		history.push({ state: el.product_image_id });
		props.changeMode('edit');
	};
	const selectShare = (detail) => {
		if (detail.share === 1 && detail.used > 1) {
			props.modalController({
				type: 'confirm',
				text: '해당 상세이미지는\n공유된 상품이 2개 이상입니다.\n목록이전을 먼저 해주세요.',
			});
		} else {
			props.modalController({
				type: 'select',
				text: '타입(공유여부)을\n변경하시겠습니까?',
				act: 'share',
			});
		}
	};
	const selectDelete = (detail) => {
		if (detail.share === 1) {
			props.modalController({
				type: 'confirm',
				text: '공유된 이미지는\n삭제할 수 없습니다.',
			});
		} else {
			props.modalController({
				type: 'select',
				text: '해당 이미지를\n삭제하시겠습니까?',
				act: 'delete',
			});
		}
	};

	const onMouseDown = (e) => {
		if (
			menuOpen !== 'close' &&
			(!menuSelect.current || !menuSelect.current.contains(e.target))
		) {
			setMenuOpen('close');
		}
	};

	useEffect(() => {
		let isSubscribed = true;
		let _modal = props.modal;
		if (_modal.act === 'share' && _modal.return) {
			product_img.change_share(detail.product_image_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.product_image_list);
				}
			});
		} else if (_modal.act === 'delete' && _modal.return) {
			product_img.remove(detail.product_image_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.product_image_list);
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
									// onClick={() => {
									// 	leftClick(el);
									// }}
								/>
								<ListButton
									alt='button'
									src={right}
									// onClick={() => {
									// 	rightClick(el);
									// }}
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
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
`;
const Wrap = styled.ul`
	margin-top: 4.85rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
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
	background-color: #e5e6ed;
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
	/* height: 11.2rem; */
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
