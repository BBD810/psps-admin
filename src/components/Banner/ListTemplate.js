import React, { useEffect, useMemo, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS, CLIENT_ADDRESS } from '../../config';
import { getLink } from '../../functions/GetLink';
import * as toggleMenu from '../../data/toggle';
import * as banner from '../../controller/banner';
import styled from 'styled-components';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';

const ListTemplate = (props) => {
	const history = useHistory();
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState('close');
	const [imgHeight, setImgHeight] = useState({});
	const [banner_id, setBanner_id] = useState('');
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);
	const [displayList, setDisplayList] = useState([]);
	let type;

	useEffect(() => {
		let isSubscribed = true;
		type = props.category.substr(0, 2);
		banner.get_list(type).then((res) => {
			if (isSubscribed && res.data.success) {
				setList(res.data.banner_list);
				if (type === '메인') {
					return setImgHeight({ height: '16.9rem' });
				} else if (type === '광고') {
					return setImgHeight({ height: '11.3rem' });
				}
			}
		});

		return () => {
			isSubscribed = false;
		};
	}, [props.category]);

	useEffect(() => {
		let isSubscribed = true;
		type = props.category.substr(0, 2);
		banner.get_display_list(type, true).then((res) => {
			if (isSubscribed && res.data.success) {
				setDisplayList(res.data.banner_list);
			}
		});

		return () => {
			isSubscribed = false;
		};
	}, [list]);

	const goDetail = (el) => {
		history.push({ state: el.banner_id });
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
		setBanner_id(el.banner_id);
		setDetail(el);
		setMenuOpen('close');
	};
	const selectEdit = (el) => {
		history.push({ state: el.banner_id });
		props.changeMode('edit');
	};
	const selectDisplay = (detail) => {
		if (detail.display === 1 && displayList.length === 1) {
			return props.modalController({
				type: 'confirm',
				text: '최소 한 개의 배너는\n노출중이어야 합니다.',
			});
		} else if (detail.display === 0 && displayList.length === 3) {
			return props.modalController({
				type: 'list',
				text: '배너는 최대 세 개만 노출이 가능합니다.\n교환할 배너를 선택해주세요.',
				list: displayList,
			});
		} else {
			goDisplay();
		}
	};
	const goDisplay = () => {
		props.modalController({
			type: 'select',
			text: '해당 배너의\n노출상태를 변경하시겠습니까?',
			act: 'display',
		});
	};
	const selectDelete = (detail) => {
		if (detail.display === 1) {
			return props.modalController({
				type: 'confirm',
				text: '노출중인 배너는\n삭제할 수 없습니다.',
			});
		} else if (detail.display === 1 && displayList.length < 2) {
			return props.modalController({
				...props.modal,
				type: 'confirm',
				text: '최소 한 개의 배너는\n노출중이어야 합니다.',
			});
		} else {
			goDelete();
		}
	};
	const goDelete = () => {
		props.modalController({
			type: 'select',
			text: '해당 배너를\n삭제하시겠습니까?',
			act: 'delete',
		});
	};
	const selectLink = (el) => {
		let link = getLink(el.page, el.part, el.subPart, el.product_id);
		window.open(`${CLIENT_ADDRESS}${link}`, '_blank');
	};
	const onMouseDown = (e) => {
		if (
			menuOpen !== 'close' &&
			(!menuSelect.current || !menuSelect.current.contains(e.target))
		) {
			setMenuOpen('close');
		}
	};

	const leftClick = (e) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i] === e) {
				if (list[i - 1]) {
					arr.push(list[i - 1], list[i]);
					break;
				} else {
					return;
				}
			}
		}
		changeOrder(arr);
	};
	const rightClick = (e) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i] === e) {
				if (list[i + 1]) {
					arr.push(list[i], list[i + 1]);
					break;
				} else {
					return;
				}
			}
		}
		changeOrder(arr);
	};

	const changeOrder = (arr) => {
		if (arr[0].display !== arr[1].display) {
			props.modalController({
				type: 'confirm',
				text: '노출 상태가 같은 배너만\n순서 변경이 가능합니다.',
			});
		} else {
			banner.change_order(arr).then((res) => {
				if (res.data.success) {
					success(res.data.banner_list);
				}
			});
		}
	};

	useEffect(() => {
		let isSubscribed = true;
		if (props.modal.act === 'display' && props.modal.return) {
			banner.change_display(banner_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.banner_list);
				}
			});
		} else if (props.modal.act === 'delete' && props.modal.return) {
			banner.remove(banner_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.banner_list);
				}
			});
		} else if (props.modal.act === 'replace' && props.modal.return) {
			const arr = [detail, displayList[props.modal.return]];
			banner.replace_display(arr).then((res) => {
				if (isSubscribed && res.data.success) {
					success(res.data.banner_list);
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
							style={imgHeight}
							onClick={() => goDetail(el)}>
							{el.display === 1 && (
								<ListState className='display'>DISPLAY</ListState>
							)}
							<ListImg
								alt='banner img'
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
										{toggleMenu.banner.map((item, idx) => (
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

export default withRouter(ListTemplate);

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