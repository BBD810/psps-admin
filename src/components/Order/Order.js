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
				setPart={setPart}
				setSubPart={setSubPart}
			/>
			<OrderList />
		</Container>
	);
};

export default Order;

const Container = styled.div``;
