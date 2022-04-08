import React, { useState } from 'react';
import styled from 'styled-components';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';
import ConfirmModal from '../Modal/Confirm';
import OrderDetailModal from '../Modal/OrderDetail';
import OrderClaimModal from '../Modal/OrderClaim';
import OrderProcessModal from '../Modal/OrderProcess';
import TrackingNumberModal from '../Modal/TrackingNumber';

const Order = (props) => {
	const [period, setPeriod] = useState(3);
	const [date, setDate] = useState({ from: '', to: '' });
	const [state, setState] = useState([]);
	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
	const onePage = 50;

	return (
		<Container>
			<OrderFilter
				period={period}
				date={date}
				page={page}
				state={state}
				setPage={setPage}
				setTotal={setTotal}
				setPeriod={setPeriod}
				setDate={setDate}
				setState={setState}
				setList={setList}
				modal={props.modal}
				setModal={props.setModal}
			/>
			<OrderList
				list={list}
				setList={setList}
				page={page}
				total={total}
				onePage={onePage}
				onClickPage={setPage}
				modal={props.modal}
				setModal={props.setModal}
			/>
			{props.modal.type === 'confirm' && (
				<ConfirmModal modal={props.modal} setModal={props.setModal} />
			)}
			{props.modal.type === 'detail' && (
				<OrderDetailModal modal={props.modal} setModal={props.setModal} />
			)}
			{props.modal.act === 'claim' && (
				<OrderClaimModal modal={props.modal} setModal={props.setModal} />
			)}
			{props.modal.act === 'process' && (
				<OrderProcessModal modal={props.modal} setModal={props.setModal} />
			)}
			{props.modal.act === 'tracking' && (
				<TrackingNumberModal
					modal={props.modal}
					setModal={props.setModal}
				/>
			)}
		</Container>
	);
};

export default Order;

const Container = styled.div``;
