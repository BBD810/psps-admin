import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as banner from '../../controller/banner';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';

const ListTemplate = (props) => {
	const history = useHistory();
	const toggleMenu = ['수정하기', '노출변경', '삭제하기', '링크확인'];
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState('close');
	const [imgHeight, setImgHeight] = useState({});
	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		let type;
		if (props.category === '메인 배너') {
			type = '메인';
		} else if (props.category === '광고 배너') {
			type = '광고';
		}
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

	console.log('list', list);

	const goDetail = (el) => {
		history.push({ state: el.banner_id });
		props.changeMode('detail');
	};
	const menuOpenController = (idx) => {
		setMenuOpen(idx);
	};
	const selectMenuController = (item, el) => {
		if (item === '수정하기') {
			selectEdit(item, el);
		} else if (item === '노출변경') {
			selectDisplay(item, el);
		} else if (item === '삭제하기') {
			selectDelete(item, el);
		} else if (item === '링크확인') {
			selectLink(item, el);
		}
		setMenuOpen('close');
	};
	const selectEdit = (item, el) => {
		history.push({ state: el });
		props.changeMode('edit');
	};
	const selectDisplay = (item, el) => {};
	const selectDelete = (item, el) => {};
	const selectLink = (item, el) => {};

	const onMouseDown = (e) => {
		if (
			menuOpen !== 'close' &&
			(!menuSelect.current || !menuSelect.current.contains(e.target))
		) {
			setMenuOpen('close');
		}
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap>
				{list.map((el, idx) => (
					<List key={idx}>
						<ListImgWrap display={el.display} style={imgHeight}>
							{el.display === 1 && (
								<ListState className='display'>DISPLAY1</ListState>
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
								<ListButton alt='button' src={left} />
								<ListButton alt='button' src={right} />
								<ListButton
									alt='button'
									src={toggle}
									onClick={() => {
										menuOpenController(idx);
									}}
								/>
								{menuOpen === idx && (
									<ToggleMenus ref={menuSelect}>
										{toggleMenu.map((item, idx) => (
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
	height: 71.15rem;
	overflow-y: scroll;
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
