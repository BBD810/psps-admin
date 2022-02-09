import React, { useEffect, useRef, useState } from 'react';
import { orderCategory } from '../../data/category';
import * as category from '../../data/link';
import styled from 'styled-components';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';

const Order = () => {
	const [part, setPart] = useState('전체보기');
	const [subPart, setSubPart] = useState('전체보기');
	const partList = category.all_part;
	const [subPartList, setSubPartList] = useState([]);
	const [period, setPeriod] = useState(false);
	const [date, setDate] = useState({ from: '', to: '' });
	const [state, setState] = useState(new Set());

	// const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(13);
	const onePage = 15;

	const onClickPage = (e) => {
		e !== page && setPage(e);
	};

	const list = Array(15).fill({
		state: '배송중',
		order_date: '2022-02-08 11:54',
		payment_date: '2022-02-08 11.55',
		product: '횡성명품한우 세트 12호 외 4건',
		name: '방병도',
		email: 'bbd810@naver.com',
		contact: '010-1234-1234',
		account: '국민은행 1234-1234-1234',
		payment_price: '1200000',
		payment_method: '신용카드 결제',
	});

	useEffect(() => {
		for (let i = 0; i < category.all_part.length; i++) {
			if (part === category.all_part[i].title) {
				setSubPart(category.all_part[i].arr[0]);
				return setSubPartList(category.all_part[i].arr);
			}
		}
	}, [part]);

	return (
		<Container>
			<OrderFilter
				part={part}
				subPart={subPart}
				partList={partList}
				subPartList={subPartList}
				period={period}
				date={date}
				state={state}
				setPart={setPart}
				setSubPart={setSubPart}
				setPeriod={setPeriod}
				setDate={setDate}
				setState={setState}
			/>
			<OrderList
				list={list}
				page={page}
				total={total}
				onePage={onePage}
				onClickPage={onClickPage}
			/>
		</Container>
	);
};

export default Order;

const Container = styled.div``;
