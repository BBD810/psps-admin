import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS, ADDRESS } from '../../config';
import { toggleMenu } from '../../data/toggle';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';

const ListTemplate = (props) => {
	const history = useHistory();
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState('close');
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		product_img.get_list().then((res) => {
			console.log(res.data);
			if (isSubscribed && res.data.success) {
				setList(res.data.product_image_list);
			}
		});

		return () => {
			isSubscribed = false;
		};
	}, []);

	const goDetail = (el) => {
		history.push({ state: el.product_image_id });
		props.changeMode('detail');
	};
	const menuOpenController = (idx) => {
		setMenuOpen(idx);
	};
	const selectMenuController = () => {};

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
