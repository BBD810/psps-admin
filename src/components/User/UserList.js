import React from 'react';
import styled from 'styled-components';
import PageSelector from '../PageSelector';

const UserList = (props) => {
	const header = [
		'이름',
		'이메일',
		'등록일',
		'주소',
		'연락처',
		'등록계좌',
		'주문내역',
	];

	return (
		<Container>
			<Head>고객목록</Head>
			<Body>
				<Header>
					{header.map((el, idx) => (
						<HeaderItem key={idx}>{el}</HeaderItem>
					))}
				</Header>
				<ListWrap>
					{props.list.map((el, idx) => (
						<List key={idx}>
							<ListItem>{el.name}</ListItem>
							<ListItem>{el.email}</ListItem>
							<ListItem>{el.date}</ListItem>
							<ListItem>{el.address}</ListItem>
							<ListItem>{el.contact}</ListItem>
							<ListItem>{el.account}</ListItem>
							<ListItem>확인하기</ListItem>
						</List>
					))}
				</ListWrap>
				<PageSelector
					page={props.page}
					total={props.total}
					onePage={props.onePage}
					onClickPage={props.onClickPage}
					style={{ marginTop: '6.2rem' }}
				/>
			</Body>
		</Container>
	);
};

export default UserList;

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
		width: 8%;
	}
	:nth-child(2) {
		width: 17%;
	}
	:nth-child(3) {
		width: 10%;
	}
	:nth-child(4) {
		width: 22%;
	}
	:nth-child(5) {
		width: 13%;
	}
	:nth-child(6) {
		width: 18%;
	}
	:nth-child(7) {
		width: 10%;
	}
`;
const ListWrap = styled.div`
	width: 100%;
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
	:nth-child(1) {
		width: 8%;
	}
	:nth-child(2) {
		width: 17%;
	}
	:nth-child(3) {
		width: 10%;
	}
	:nth-child(4) {
		width: 22%;
	}
	:nth-child(5) {
		width: 13%;
	}
	:nth-child(6) {
		width: 18%;
	}
	:nth-child(7) {
		width: 10%;
		text-decoration: underline;
	}
`;
