import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as data from '../data/arr';

const Category = (props) => {
	const [arr, setArr] = useState(data.bannerCategory);
	const [info, setInfo] = useState({});

	useEffect(() => {
		if (props.menu === '배너') {
			setArr(data.bannerCategory);
		} else if (props.menu === '회원') {
			setArr(data.memberCategory);
		} else if (props.menu === '상품') {
			setArr(data.productCategory);
		} else if (props.menu === '결제') {
			setArr(data.paymentCategory);
		}
	}, [props.menu]);

	useEffect(() => {
		props.getCategory(arr[0].item);
	}, [arr]);

	useEffect(() => {
		for (let i = 0; i < arr.length; i++) {
			if (props.category === arr[i].item) {
				return setInfo(arr[i]);
			}
		}
	}, [props.category]);

	const categoryController = (e) => {
		props.getCategory(e.target.innerText);
	};
	console.log(props);

	return (
		<CategoryContainer>
			<TitleBox>
				<CategoryWrap>
					{arr.map((el, idx) => (
						<CategoryItem
							key={idx}
							select={props.category === el.item}
							onClick={categoryController}>
							{el.item}
						</CategoryItem>
					))}
				</CategoryWrap>
				<CurrentCategory>
					{`${props.menu} 관리 / ${props.category}`}
				</CurrentCategory>
			</TitleBox>
			<SubtitleBox>
				<Subtitle>{props.title}</Subtitle>
				<Desc>{props.desc}</Desc>
			</SubtitleBox>
		</CategoryContainer>
	);
};

export default Category;

const CategoryContainer = styled.div`
	margin-top: 5.1rem;
	width: 127rem;
	height: 15.45rem;
`;
const TitleBox = styled.div`
	width: 100%;
	height: 5.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #e5e6ed;
`;
const CategoryWrap = styled.ul`
	display: flex;
	align-items: center;
`;
const CategoryItem = styled.li`
	height: 5.6rem;
	line-height: 5.6rem;
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #5e667b;
	padding: 0 2.9rem;
	cursor: pointer;
	${(props) =>
		props.select && `color:#5887FF; border-bottom:4px solid #5887FF`}
`;
const CurrentCategory = styled.p`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.3rem;
	font-family: 'kr-r';
	color: #5e667b;
`;
const SubtitleBox = styled.div`
	height: 9.85rem;
	margin: 0 3rem;
	padding-top: 3rem;
	border-bottom: 1px solid #e5e6ed;
`;
const Subtitle = styled.h4`
	height: 2.1rem;
	line-height: 2.1rem;
	font-size: 1.5rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const Desc = styled.p`
	margin-top: 0.4rem;
	height: 3.2rem;
	line-height: 1.6rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #5e667b;
`;
