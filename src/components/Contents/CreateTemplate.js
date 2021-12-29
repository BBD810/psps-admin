import React, { useState } from 'react';
import styled from 'styled-components';

const CreateTemplate = () => {
	const types = ['메인', '광고'];
	const [type, setType] = useState('메인');
	const [title, setTitle] = useState('');

	const typeController = (e) => {
		setType(e.target.innerText);
	};
	const titleController = (e) => {
		setTitle(e.target.value);
	};
	return (
		<Container>
			<Left>
				<Title>타입</Title>
				<Desc>등록 후 수정이 불가능합니다.</Desc>
				<TypeSelectBox>
					{types.map((el, idx) => (
						<TypeSelect
							key={idx}
							select={type === el}
							onClick={typeController}>
							{el}
						</TypeSelect>
					))}
				</TypeSelectBox>
				<Title>제목</Title>
				<Input
					value={title}
					placeholder='제목을 입력해주세요.(최대 45자)'
					onChange={titleController}
				/>
				<Title>링크</Title>
				<Desc>{`배너를 클릭할 시 이동할 페이지 경로를 정합니다.\n특정 상품을 지정하실 경우 올바른 경로를 선택 및 입력해주세요.`}</Desc>
				<Subtitle>페이지</Subtitle>
			</Left>
			<Right></Right>
		</Container>
	);
};

export default CreateTemplate;

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
	padding: 3.05rem 0 0 0;
	display: flex;
`;
const Left = styled.div`
	width: 50%;
	height: 100%;
	/* border: 1px solid red; */
`;
const Right = styled.div`
	width: 50%;
	height: 100%;
	/* border: 1px solid red; */
`;
const Title = styled.h4`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Subtitle = styled.p`
	height: 1.6rem;
	line-height: 1.6rem;
	font-size: 1.1rem;
	font-family: 'kr-r';
	color: #5e667b;
`;
const Desc = styled.p`
	font-size: 1rem;
	font-family: 'kr-r';
	color: #848ca2;
`;
const TypeSelectBox = styled.ul`
	width: 40rem;
	height: 6.2rem;
	line-height: 6.2rem;
	text-align: center;
	margin: 1.2rem 0 5rem 0.4rem;
	display: flex;
	border: 1px solid #a8b0c3;
	border-radius: 4px;
`;
const TypeSelect = styled.li`
	width: 50%;
	height: 100%;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #5e667b;
	border-radius: 4px;
	${(props) =>
		props.select &&
		`border: 2px solid #5887FF; font-family:'kr-b';color:#111A31	`}
`;
const Input = styled.input`
	margin-top: 1.2rem;
	margin-bottom: 5rem;
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #7f8697;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
`;
