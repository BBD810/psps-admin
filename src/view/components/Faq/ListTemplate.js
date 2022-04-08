import React from 'react';
import { faqTypeTransform } from '../../../utils/FaqTypeTransform';
import styled from 'styled-components';

const ListTemplate = (props) => {
	const header = ['타입', '질문', '답변', '관리'];

	const createFaq = () => {
		props.setModal({ act: 'create' });
	};
	const editFaq = (el) => {
		props.setModal({ act: 'edit', data: el, qu_id: el.qu_id });
	};
	const removeFaq = (el) => {
		props.setModal({
			type: 'select',
			text: '삭제하시겠습니까?',
			act: 'delete',
			qu_id: el.qu_id,
		});
	};

	return (
		<Container>
			<Head>FAQ 목록</Head>
			<Body>
				<Header>
					{header.map((el, idx) => (
						<HeaderItem key={idx}>{el}</HeaderItem>
					))}
				</Header>
				<ListWrap>
					{props.list &&
						props.list.map((el, idx) => (
							<List key={idx}>
								<ListItem>{faqTypeTransform(el.qu_type_id)}</ListItem>
								<ListItem
									onClick={() => {
										editFaq(el);
									}}>
									{el.qu_title}
								</ListItem>
								<ListItem
									onClick={() => {
										editFaq(el);
									}}>
									{el.qu_text}
								</ListItem>
								<ListItem
									onClick={() => {
										removeFaq(el);
									}}>
									삭제하기
								</ListItem>
							</List>
						))}
				</ListWrap>
			</Body>
			<Button onClick={createFaq}>추가하기</Button>
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
	margin-bottom: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
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
	width: 100%;
	background-color: #fff;
`;
const Header = styled.ul`
	padding: 0 4rem;
	width: 100%;
	height: 4.6rem;
	line-height: 4.6rem;
	display: flex;
	justify-content: center;
	box-shadow: -3px 4px 30px #e5e6ed80;
	border-radius: 4px;
`;
const HeaderItem = styled.li`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #5e667b;
	:nth-child(1) {
		width: 10%;
		padding-left: 0.4rem;
	}
	:nth-child(2) {
		width: 40%;
	}
	:nth-child(3) {
		width: 40%;
	}
	:nth-child(4) {
		width: 10%;
	}
`;
const ListWrap = styled.div`
	width: 100%;
	height: 46.9rem;
	overflow-y: auto;
`;
const List = styled.ul`
	padding: 0 4rem;
	width: 100%;
	height: 6.7rem;
	display: flex;
	justify-content: center;
	align-items: center;
	:nth-child(odd) {
		border: 1px solid #f5f5f5;
		background-color: #fff;
	}
	:nth-child(even) {
		background-color: #f5f5f5;
	}
`;
const ListItem = styled.li`
	font-size: 1.2rem;
	color: #2a3349;
	word-break: keep-all;
	white-space: pre-wrap;
	:nth-child(1) {
		width: 10%;
		padding-left: 0.4rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 40%;
		padding-right: 3.7rem;
		cursor: pointer;
		:hover {
			text-decoration: underline;
		}
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-ms-line-clamp: 2;
		-moz-line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	:nth-child(4) {
		width: 10%;
		text-decoration: underline;
		cursor: pointer;
	}
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	color: #fff;
	position: absolute;
	top: -5.75rem;
	right: 0;
`;
