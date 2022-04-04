import React, { useEffect, useState } from 'react';
import * as productController from '../../controller/product';
import styled from 'styled-components';
import Spinner from '../Spinner';

const StateInfo = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [detail, setDetail] = useState({ state: 'F', recommend: 0 });
	const [optionList, setOptionList] = useState([]);
	const [recommendList, setRecommendList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		if (props.mode === 'edit' && props.product_id) {
			setIsLoading(true);
			productController.get_detail(props.product_id).then((res) => {
				if (isSubscribed && res.data.success) {
					setDetail(res.data.product);
				}
			});
			setIsLoading(false);
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.mode, props.product_id]);

	const getRecommendList = () => {
		productController.get_recommend_list().then((res) => {
			if (res.data.success) {
				setRecommendList(res.data.product_recommend_list);
			}
		});
	};

	useEffect(() => {
		let isSubscribed = true;
		if (props.mode === 'detail') {
			setIsLoading(true);
			productController
				.get_detail(props.product_id)
				.then((res) => {
					if (isSubscribed && res.data.success) {
						setDetail(res.data.product);
						setOptionList(res.data.product_option_list);
					}
				})
				.then(getRecommendList());
			setIsLoading(false);
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.mode, props.product_id]);

	const selectDisplay = (e) => {
		const text = e.target.innerText;
		if (!props.active) {
			return props.setModal({
				type: 'confirm',
				text: '노출 여부 혹은 추천상품등록 여부는\n상세조회에서 가능합니다.',
			});
		} else if (
			(text === '노출' && detail.state === 'O') ||
			(text === '노출안함' && detail.state === 'F')
		) {
			return;
		} else if (text === '노출안함' && detail.recommend) {
			return props.setModal({
				type: 'confirm',
				text: '추천상품으로 등록된 상품은\n노출 여부 변경이 불가능합니다.',
			});
		} else {
			let count = 0;
			for (let i = 0; i < optionList.length; i++) {
				if (optionList[i].state === 'O') {
					count++;
				}
			}
			if (text === '노출' && count === 0) {
				return props.setModal({
					type: 'confirm',
					text: '상품을 노출 상태로 변경하려면\n최소 1개 이상의 옵션이 노출 상태여야 합니다.',
				});
			} else {
				productController.change_display(detail.product_id).then((res) => {
					if (res.data.success) {
						setDetail({ ...detail, state: res.data.product.state });
						props.setModal({
							type: 'confirm',
							text: '노출여부가 변경되었습니다.',
						});
					}
				});
			}
		}
	};

	const selectRecommend = (e) => {
		const text = e.target.innerText;
		if (!props.active) {
			return props.setModal({
				type: 'confirm',
				text: '노출여부 혹은 추천상품 등록 여부는\n상세조회에서 가능합니다.',
			});
		} else if (
			(text === '추천상품' && detail.recommend) ||
			(text === '등록안함' && !detail.recommend)
		) {
			return;
		} else if (detail.state !== 'O') {
			return props.setModal({
				type: 'confirm',
				text: '노출하지 않은 상품은\n추천 상품으로 등록할 수 없습니다.',
			});
		} else if (text === '등록안함' && recommendList.length < 2) {
			return props.setModal({
				type: 'confirm',
				text: '추천 상품은\n최소 1개 이상 있어야 합니다.',
			});
		} else if (text === '추천상품' && recommendList.length > 5) {
			props.setModal({
				type: 'confirm',
				text: '추천상품은\n최대 6개까지 등록 가능합니다.',
			});
		} else {
			productController.change_recommend(detail.product_id).then((res) => {
				if (res.data.success) {
					setDetail({ ...detail, recommend: res.data.product.recommend });
					props.setModal({
						type: 'confirm',
						text: '추천상품 여부가 변경되었습니다.',
					});
					getRecommendList();
				}
			});
		}
	};

	return (
		<Container>
			{isLoading && <Spinner />}
			<Head>상태 정보</Head>
			<Body>
				<Content>
					<Left>
						<LeftInner>
							<Title>노출 상태 관리</Title>
							<Desc>추천 상품으로 등록했을 시 취소가 불가능합니다.</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<TypeBox>
								{['노출', '노출안함'].map((el, idx) => (
									<TypeItem
										key={idx}
										active={props.active}
										selected={
											idx === 0
												? detail.state === 'O'
												: detail.state === 'F'
										}
										onClick={selectDisplay}>
										{el}
									</TypeItem>
								))}
							</TypeBox>
						</RightInner>
					</Right>
				</Content>
				<Content>
					<Left>
						<LeftInner>
							<Title>추천 상품 등록</Title>
							<Desc>노출중인 상품만 등록이 가능합니다.</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<TypeBox>
								{['추천상품', '등록안함'].map((el, idx) => (
									<TypeItem
										key={idx}
										active={props.active}
										selected={
											(idx === 0 && detail.recommend) ||
											(idx === 1 && !detail.recommend)
										}
										onClick={selectRecommend}>
										{el}
									</TypeItem>
								))}
							</TypeBox>
						</RightInner>
					</Right>
				</Content>
			</Body>
		</Container>
	);
};

export default React.memo(StateInfo);

const Container = styled.div`
	width: 119rem;
	margin-bottom: 4rem;
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
	background-color: #fff;
`;
const Content = styled.div`
	height: 9.1rem;
	display: flex;
	margin-bottom: 0.4rem;
	box-shadow: -3px 4px 30px #e5e6ed80;
	border-radius: 4px;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const Left = styled.div`
	width: 28rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const LeftInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
	border-right: 1px solid #f5f5f5;
`;
const Title = styled.h4`
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
	letter-spacing: 0.13px;
`;
const Desc = styled.p`
	margin-top: 1rem;
	font-size: 1rem;
	color: #848ca2;
	letter-spacing: -0.2px;
`;
const Right = styled.div`
	width: 91rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RightInner = styled.div`
	margin: 2rem 0 2.7rem;
	padding: 0 4rem;
	width: 100%;
`;
const TypeBox = styled.div`
	width: 40rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	border: 1px solid #a8b0c3;
`;
const TypeItem = styled.div`
	width: 50%;
	height: 3.1rem;
	line-height: 3.1rem;
	text-align: center;
	font-size: 1.4rem;
	border-radius: 4px;
	cursor: pointer;
	${(props) =>
		props.selected
			? `color:#111A31; font-family:'kr-b'; 
				border:2px solid #A8B0C3;`
			: `color: #5E667B;  `}
	${(props) => props.selected && props.active && `border:2px solid #5887FF`};
`;
