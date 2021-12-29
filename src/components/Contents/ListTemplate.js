import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import left from '../../images/left.svg';
import right from '../../images/right.svg';
import toggle from '../../images/toggle.svg';
import banner1 from '../../images/banner1.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
import banner4 from '../../images/banner4.png';
import banner5 from '../../images/banner5.png';

const ListTemplate = (props) => {
	const toggleMenu = ['수정하기', '노출취소', '삭제하기', '링크확인'];
	const menuSelect = useRef();
	const [menuOpen, setMenuOpen] = useState('close');
	// const [list, setList] = [];
	useEffect(() => {
		// 리스트 받아와서 설정해주기
	}, []);

	const menuOpenController = (idx) => {
		setMenuOpen(idx);
	};
	const selectMenuController = (e) => {
		alert(e.target.innerText);
		setMenuOpen('close');
	};
	const onMouseDown = (e) => {
		if (
			menuOpen !== 'close' &&
			(!menuSelect.current || !menuSelect.current.contains(e.target))
		) {
			setMenuOpen('close');
		}
	};

	const list = [
		{ title: '품생품사 회사소개 배너', img: banner1, display: 1 },
		{ title: '품생품사 회사소개 배너', img: banner2, display: 1 },
		{ title: '품생품사 회사소개 배너', img: banner3, display: 1 },
		{ title: '품생품사 회사소개 배너', img: banner4, display: 0 },
		{ title: '품생품사 회사소개 배너', img: banner5, display: 0 },
		{ title: '품생품사 회사소개 배너', img: banner1, display: 0 },
		{ title: '품생품사 회사소개 배너', img: banner2, display: 0 },
		{ title: '품생품사 회사소개 배너', img: banner3, display: 0 },
		{ title: '품생품사 회사소개 배너', img: banner4, display: 0 },
	];

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap>
				{list.map((el, idx) => (
					<List key={idx}>
						<ListImgWrap display={el.display} style={props.img_height}>
							{el.display === 1 && (
								<ListState className='display'>DISPLAY1</ListState>
							)}
							<ListImg alt='banner img' src={el.img} />
						</ListImgWrap>
						<ListBottom>
							<ListTitle>{el.title}</ListTitle>
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
										{toggleMenu.map((el, idx) => (
											<ToggleMenu
												key={idx}
												onClick={(e) => {
													selectMenuController(e);
												}}>
												{el}
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
	width: 118.4rem;
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
`;
const ListButtons = styled.div`
	display: flex;
	position: relative;
`;
const ListButton = styled.img`
	width: 0.9rem;
	height: 1.3rem;
	margin-left: 0.6rem;
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
	font-family: 'kr-r';
	color: #5e667b;
	text-align: center;
	:hover {
		background-color: #e5e6ed;
	}
`;
