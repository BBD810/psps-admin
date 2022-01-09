import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PageSelector from '../PageSelector';

const ListTemplate = () => {
	const body = useRef();
	const [page, setPage] = useState(1);
	const [editNumber, setEditNumber] = useState(false);
	const [detail, setDetail] = useState({});
	const [name, setName] = useState('');
	const [owner, setOwner] = useState('');
	const [business_number, setBusiness_number] = useState('');
	const [address, setAddress] = useState('');
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');
	const [manager_tel, setManager_tel] = useState('');

	const headerArr = [
		'상호명',
		'대표',
		'사업자 번호',
		'사업장 소재지',
		'연락처',
		'이메일',
		'담당자 연락처',
	];
	const list = new Array(12).fill({
		name: '플레이삼육오(주)',
		owner: '강석봉',
		business_number: '139-81-46152',
		address: '서울특별시 강서구 공항대로 213 3층 302-12호',
		tel: '010-1234-1234',
		email: 'abc@gmail.com',
		manager_tel: '010-9876-9876',
	});
	const editController = (el, idx) => {
		setDetail(el);
		setEditNumber(idx);
	};

	const onMouseDown = (e) => {
		if (editNumber && (!body.current || !body.current.contains(e.target))) {
			setEditNumber(false);
		}
	};

	return (
		<Container onMouseDown={onMouseDown}>
			<Wrap>
				<Header>
					{headerArr.map((el, idx) => (
						<HeaderList key={idx}>{el}</HeaderList>
					))}
					<HeaderButton>추가하기</HeaderButton>
				</Header>
				<Body ref={body}>
					{list.map((el, idx) => (
						<BodyList key={idx} edit={idx === editNumber}>
							{idx !== editNumber ? (
								<BodyItem>{el.name}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.owner}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.owner}
									onChange={(e) => {
										setOwner(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.business_number}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.business_number}
									onChange={(e) => {
										setBusiness_number(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.address}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.address}
									onChange={(e) => {
										setAddress(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.tel}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.tel}
									onChange={(e) => {
										setTel(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.email}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							)}
							{idx !== editNumber ? (
								<BodyItem>{el.manager_tel}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.manager_tel}
									onChange={(e) => {
										setManager_tel(e.target.value);
									}}
								/>
							)}

							<BodyItem>
								<Buttons>
									<Button
										filled
										onClick={() => {
											editController(el, idx);
										}}>
										수정
									</Button>
									<Button border>삭제</Button>
								</Buttons>
							</BodyItem>
						</BodyList>
					))}
				</Body>
				{/* <PageSelector /> */}
			</Wrap>
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
`;
const Wrap = styled.div``;
const Header = styled.ul`
	width: 100%;
	height: 4.8rem;
	line-height: 4.8rem;
	padding: 0 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #e5e6ed;
`;
const HeaderList = styled.li`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #a8b0c3;
	text-align: center;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;
const Body = styled.div`
	width: 100%;
	height: 51.6rem;
	padding: 0.95rem 0;
	overflow-y: hidden;
`;
const BodyList = styled.ul`
	width: 100%;
	height: 4.3rem;
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #2a3349;
	display: flex;
	align-items: center;
`;
const BodyItem = styled.li`
	height: 4.3rem;
	line-height: 4.3rem;
	text-align: center;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 1;
	-moz-line-clamp: 1;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;
const HeaderButton = styled.button`
	width: 14.8rem;
	height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
	border: 2px solid #2a3349;
	border-radius: 4px;
	background-color: #fff;
	margin: 0 0.5rem;
`;
const EditInput = styled.input`
	height: 2.5rem;
	/* line-height: 4.3rem; */
	text-align: center;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 1;
	-moz-line-clamp: 1;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;

const Buttons = styled.div`
	width: 14.8rem;
`;
const Button = styled.button`
	width: 7rem;
	height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	:nth-child(1) {
		margin-right: 0.6rem;
	}
	${(props) =>
		props.filled
			? `background-color:#2A3349;color:#fff; `
			: `background-color:#fff;color:#2A3349;border:2px solid #2A3349; `}
`;
