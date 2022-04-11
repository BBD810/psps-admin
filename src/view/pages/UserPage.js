import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../view/components/Common/SideBar';
import Category from '../../view/components/Common/Category';
import Footer from '../../view/components/Common/Footer';
import UserFilter from '../../view/components/User/UserFilter';
import UserList from '../../view/components/User/UserList';
import UserOrderModal from '../../view/components/Modal/UserOrder';

const UserPage = () => {
	const mode = 'list';
	const [menu, setMenu] = useState('고객');
	const [category, setCategory] = useState('고객 목록');
	const [modal, setModal] = useState({ type: '' });
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [list, setList] = useState([]);
	const onePage = 10;

	return (
		<Container>
			<SideBar menu={menu} setMenu={setMenu} />
			<Contents>
				<Category
					category={category}
					getCategory={setCategory}
					mode={mode}
					menu={menu}
					modal={modal}
					setModal={setModal}
				/>
				<UserFilter page={page} setList={setList} setTotal={setTotal} />
				<UserList
					list={list}
					setList={setList}
					page={page}
					total={total}
					onePage={onePage}
					onClickPage={setPage}
					modal={modal}
					setModal={setModal}
				/>
				{modal.type === 'order' && (
					<UserOrderModal
						page={page}
						setPage={setPage}
						total={total}
						modal={modal}
						setModal={setModal}
					/>
				)}
				<Footer />
			</Contents>
		</Container>
	);
};

export default UserPage;

const Container = styled.div`
	width: 160rem;
	margin: 4.25rem 0;
	padding-right: 8.09rem;
	display: flex;
	position: relative;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 2px 6px 30px #00000033;
	@media ${(props) => props.theme.hd} {
		margin: 3rem 0;
	}
`;
const Contents = styled.div`
	min-height: 78.9rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media ${(props) => props.theme.hd} {
		min-height: 66rem;
	}
`;
