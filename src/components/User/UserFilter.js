import React, { useEffect, useRef, useState } from 'react';
import * as userController from '../../controller/user';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const LeftWrap = ({ data }) => {
	return (
		<Left>
			<LeftInner>
				<Title>{data && data.title}</Title>
				<Desc>{data && data.desc}</Desc>
			</LeftInner>
		</Left>
	);
};

const UserFilter = (props) => {
	const searchBox = useRef();
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchItem, setSearchItem] = useState('이름');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const onChangeSearchItem = (el) => {
		if (el === '이름' && phoneNumber !== '') {
			setName(phoneNumber);
			setPhoneNumber('');
		} else if (el === '연락처' && name !== '') {
			setPhoneNumber(name);
			setName('');
		}
		setSearchItem(el);
		setSearchOpen(false);
	};
	const items = [{ title: '검색', desc: '' }];

	useEffect(() => {
		let isSubscribed = true;
		userController.getList(props.page, name, phoneNumber).then((res) => {
			if (isSubscribed && res.data.success) {
				props.setTotal(res.data.total);
				props.setList(res.data.user_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, []);

	const onChangeSearchInput = (e) => {
		let value = e.target.value;
		searchItem === '이름' ? setName(value) : setPhoneNumber(value);
	};

	const onEnter = (e) => {
		e.key === 'Enter' && onSubmit();
	};

	const onSubmit = () => {
		userController.getList(props.page, name, phoneNumber).then((res) => {
			if (res.data.success) {
				props.setList(res.data.user_list);
			}
		});
	};

	const onMouseDown = (e) => {
		searchOpen &&
			(!searchBox.current || !searchBox.current.contains(e.target)) &&
			setSearchOpen(false);
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Head>필터기능</Head>
			<Body>
				<Content>
					<LeftWrap data={items[0]} />
					<Right>
						<RightInner>
							{searchOpen ? (
								<ItemSelectWrap ref={searchBox}>
									<ItemSelectList>{'이름'}</ItemSelectList>
									{['이름', '연락처'].map((el, idx) => (
										<ItemSelectList
											key={idx}
											onClick={() => {
												onChangeSearchItem(el);
											}}>
											{el}
										</ItemSelectList>
									))}
								</ItemSelectWrap>
							) : (
								<ItemSelected
									onClick={() => {
										setSearchOpen(true);
									}}>
									<ItemText>{searchItem}</ItemText>
									<ItemSelectImg alt='select button' src={down} />
								</ItemSelected>
							)}
							<SearchInput
								placeholder={
									searchItem === '이름'
										? '이름을 입력해주세요.'
										: '연락처를 입력해주세요.'
								}
								onKeyDown={onEnter}
								onChange={onChangeSearchInput}
							/>
						</RightInner>
					</Right>
				</Content>
			</Body>
			<Button onClick={onSubmit}>적용하기</Button>
		</Container>
	);
};

export default UserFilter;

const Container = styled.div`
	width: 119rem;
	margin-bottom: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Head = styled.div`
	width: 100%;
	margin-bottom: 0.4rem;
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #fff;
	text-align: center;
	border-radius: 4px;
	background-color: #5e667b;
`;
const Body = styled.div`
	background-color: #fff;
`;

const Content = styled.div`
	height: 9.1rem;
	display: flex;
	margin-bottom: 0.4rem;
	box-shadow: -3px 4px 30px #e5e6ed80;
	border-radius: 4px;
	:nth-last-child(1) {
		margin: 0;
	}
	:nth-child(3) .grid {
		width: 65%;
		height: 100%;
		padding: 2rem 4rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}
`;

const Left = styled.div`
	width: 28rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LeftInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	border-right: 1px solid #f5f5f5;
`;
const Title = styled.h4`
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
	letter-spacing: 0.13px;
`;
const Desc = styled.p`
	margin-top: 1rem;
	font-size: 1rem;
	color: #848ca2;
	letter-spacing: -0.2px;
`;

const Right = styled.div`
	width: 91rem;
	display: flex;
	align-items: center;
`;
const RightInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	display: flex;
	position: relative;
`;

const ItemSelected = styled.div`
	width: 9rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
	position: absolute;
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
	width: 9rem;
	max-height: 16rem;
	line-height: 3.1rem;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: auto;
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
const SearchInput = styled.input`
	width: 16rem;
	height: 3.1rem;
	margin-left: 9.4rem;
	font-size: 1.2rem;
	color: #7f8697;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	margin-top: 1rem;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
