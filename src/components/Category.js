import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as data from '../data/category';

const Category = (props) => {
	const [arr, setArr] = useState(data.bannerCategory);
	const [info, setInfo] = useState(false);
	const [main, setMain] = useState(false);
	const [sub, setSub] = useState(false);

	useEffect(() => {
		if (props.menu === '배너') {
			setArr(data.bannerCategory);
		} else if (props.menu === '공급원') {
			setArr(data.supplierCategory);
		} else if (props.menu === '상품') {
			setArr(data.productCategory);
		} else if (props.menu === '상품 이미지') {
			setArr(data.productImgCategory);
		} else if (props.menu === '주문') {
			setArr(data.orderCategory);
		} else if (props.menu === '고객') {
			setArr(data.userCategory);
		} else if (props.menu === 'FAQ') {
			setArr(data.faqCategory);
		}
		for (let i = 0; i < arr.length; i++) {
			if (props.category === arr[i].item) {
				setInfo(arr[i]);
				break;
			}
		}
		// eslint-disable-next-line
	}, [props.menu, props.category]);

	useEffect(() => {
		props.getCategory(arr[0].item);
		// eslint-disable-next-line
	}, [arr]);

	useEffect(() => {
		let title;
		let desc;
		if (props.mode === 'list') {
			title = info.list_main;
			desc = info.list_sub;
		} else if (props.mode === 'detail') {
			title = info.detail_main;
			desc = info.detail_sub;
		} else if (props.mode === 'edit') {
			title = info.edit_main;
			desc = info.edit_sub;
		}
		setMain(title);
		setSub(desc);
	}, [props.mode, props.category, info]);

	const onChangeCategory = (e) => {
		props.getCategory(e.target.innerText);
	};

	return (
		<CategoryContainer>
			<TitleBox>
				<CategoryWrap>
					{arr.map((el, idx) => (
						<CategoryItem
							key={idx}
							select={props.category === el.item}
							onClick={onChangeCategory}>
							{el.item}
						</CategoryItem>
					))}
				</CategoryWrap>
				<CurrentCategory>
					{`${props.menu} / ${props.category}`}
				</CurrentCategory>
			</TitleBox>
			<SubtitleBox>
				<Subtitle>{main && main}</Subtitle>
				<Desc>{sub && sub}</Desc>
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
	color: #5e667b;
`;
