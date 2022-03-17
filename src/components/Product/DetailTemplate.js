import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { priceToString } from '../../functions/PriceToString';
import { IMG_ADDRESS } from '../../config';
import * as _product from '../../controller/product';
import styled from 'styled-components';
import check_icon from '../../images/check_icon.svg';
import empty_icon from '../../images/empty_icon.svg';
import StateInfo from '../Product/StateInfo';

const DetailTemplate = (props) => {
	const history = useHistory();
	const [detail, setDetail] = useState({});
	const [optionList, setOptionList] = useState([]);
	let isSubscribed = true;

	useEffect(() => {
		if (history.location.state) {
			const _state = history.location.state;
			if (_state.from) {
				const _product_id = _state.product_id;
				getDetail(_product_id);
			} else {
				const _product_id = _state;
				getDetail(_product_id);
			}
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, [history.location.state]);

	const getDetail = (_product_id) => {
		_product.get_detail(_product_id).then((res) => {
			if (isSubscribed && res.data.success) {
				setDetail(res.data.product);
				setOptionList(res.data.product_option_list);
				history.replace();
			}
		});
	};
	const selectList = () => {
		props.setMode('list');
	};
	const selectDelete = () => {
		if (detail.recommend) {
			return props.setModal({
				type: 'confirm',
				text: '추천 상품은\n삭제할 수 없습니다.',
			});
		} else {
			props.setModal({
				type: 'select',
				text: '삭제하시겠습니까?',
				act: 'delete',
			});
		}
	};
	const selectEdit = () => {
		history.push({ state: detail.product_id });
		props.setMode('edit');
	};

	useEffect(() => {
		let isSubscribed = true;
		const _modal = props.modal;
		if (_modal.act === 'delete' && _modal.return) {
			_product.remove(detail.product_id).then((res) => {
				isSubscribed && res.data.success && success();
			});
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, [props.modal.type, detail.product_id]);

	const success = () => {
		props.setModal({ type: '' });
		props.setMode('list');
	};

	return (
		<Container>
			<StateInfo
				active={true}
				mode={props.mode}
				modal={props.modal}
				setModal={props.setModal}
				product_id={detail.product_id}
			/>
			<BasicInfo>
				<Head>기본 정보</Head>
				<Body>
					<Content style={{ height: '7.1rem' }}>
						<Left>
							<LeftInner>
								<Title>상품명</Title>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								<ItemDesc>{detail.title}</ItemDesc>
							</RightInner>
						</Right>
					</Content>

					<Content style={{ height: '11.1rem' }}>
						<Left>
							<LeftInner>
								<Title>상품 분류</Title>
								<Desc>등록 후 수정이 불가능합니다.</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								<Items>
									<Item>
										<ItemTitle>대분류</ItemTitle>
										<ItemDesc>{detail.part}</ItemDesc>
									</Item>
									<Item>
										<ItemTitle>소분류</ItemTitle>
										<ItemDesc>{detail.subPart}</ItemDesc>
									</Item>
								</Items>
							</RightInner>
						</Right>
					</Content>
					<Content style={{ height: '24rem' }}>
						<Left>
							<LeftInner>
								<Title>상품 옵션</Title>
								<Desc>{`상품 내 옵션을 저장하고 관리합니다.\n옵션 전체를 품절로 변경할 시 품절 상품으로\n홈페이지에 노출됩니다.\n옵션이 없을 경우 상품을 노출할 수 없습니다.`}</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner option>
								<Option>
									<OptionHeader>
										{[
											'옵션명',
											'기존가',
											'판매가',
											'노출',
											'품절',
										].map((el, idx) => (
											<OptionHeaderItem key={idx}>
												{el}
											</OptionHeaderItem>
										))}
									</OptionHeader>
									<OptionBody>
										{optionList &&
											optionList.map((el, idx) => (
												<OptionList key={idx}>
													<OptionItem soldOut={!el.stock}>
														{el.title}
													</OptionItem>
													<OptionItem soldOut={!el.stock}>
														{priceToString(el.price)}
													</OptionItem>
													<OptionItem soldOut={!el.stock}>
														{priceToString(
															el.price - el.discount
														)}
													</OptionItem>
													<OptionItem>
														<OptionIcon
															src={
																optionList[idx].state === 'O'
																	? check_icon
																	: empty_icon
															}
														/>
													</OptionItem>
													<OptionItem>
														<OptionIcon
															src={
																optionList[idx].stock
																	? empty_icon
																	: check_icon
															}
														/>
													</OptionItem>
												</OptionList>
											))}
									</OptionBody>
								</Option>
							</RightInner>
						</Right>
					</Content>
					<Content style={{ height: '22.3rem' }}>
						<Left>
							<LeftInner>
								<Title>대표 이미지</Title>
								<Desc>{`사이즈 : 가로 600px, 세로 552px 권장\n비율이 맞지 않을 시 상품 이미지가 원본과 상이할 수 있습니다. `}</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								{detail.temp_image && (
									<ThumbnailImg
										alt=''
										src={`${IMG_ADDRESS}/${detail.temp_image}`}
									/>
								)}
							</RightInner>
						</Right>
					</Content>
					<Content style={{ height: '32.9rem' }}>
						<Left>
							<LeftInner>
								<Title>상품 상세 이미지</Title>
								<Desc>{`사이즈 : 가로 600px, 세로 552px 권장\n비율이 맞지 않을 시 상품 이미지가 원본과 상이할 수 있습니다. `}</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								<DetailImgWrap>
									{detail.temp_detail_image && (
										<DetailImg
											alt=''
											src={`${IMG_ADDRESS}/${detail.temp_detail_image}`}
										/>
									)}
								</DetailImgWrap>
							</RightInner>
						</Right>
					</Content>
					<Content style={{ height: '9.4rem' }}>
						<Left>
							<LeftInner>
								<Title>공급업체 정보</Title>
								<Desc>{`상품의 공급원을 등록합니다.`}</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								<ItemDesc>{detail.supplier_name}</ItemDesc>
							</RightInner>
						</Right>
					</Content>
					<Content style={{ height: '14.2rem' }}>
						<Left>
							<LeftInner>
								<Title>상품 정보</Title>
								<Desc>{`상품의 필수 표기정보를 등록합니다.`}</Desc>
							</LeftInner>
						</Left>
						<Right>
							<RightInner>
								<RequireList>
									<RequireTitle>원산지</RequireTitle>
									<RequireDesc>{detail.origin}</RequireDesc>
								</RequireList>
								<RequireList>
									<RequireTitle>보관방법</RequireTitle>
									<RequireDesc>{detail.storage}</RequireDesc>
								</RequireList>
							</RightInner>
						</Right>
					</Content>
				</Body>
			</BasicInfo>
			<Buttons>
				<Button border onClick={selectList}>
					목록으로
				</Button>
				<Button border onClick={selectDelete}>
					삭제하기
				</Button>
				<Button filled onClick={selectEdit}>
					수정하기
				</Button>
			</Buttons>
		</Container>
	);
};

export default DetailTemplate;

const Container = styled.div`
	width: 119rem;
	padding-top: 3.05rem;
	position: relative;
`;

const BasicInfo = styled.div`
	width: 119rem;
	margin-bottom: 2.1rem;
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
	display: flex;
	margin-bottom: 0.4rem;
	box-shadow: 0px 0px 10px #e5e6ed80;
	border-radius: 4px;
	:nth-last-child(1) {
		margin: 0;
	}
`;

const Left = styled.div`
	width: 28rem;
	display: flex;
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
	position: relative;
	${(props) => props.option && `display: flex`}
`;

const Items = styled.div`
	width: 43rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
`;
const Item = styled.div`
	width: 100%;
	position: relative;
	:nth-child(1) {
		margin-right: 1rem;
	}
`;
const ThumbnailImg = styled.img`
	width: 17.7rem;
	height: 16.3rem;
`;
const DetailImgWrap = styled.div`
	width: 56rem;
	height: 24.8rem;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #5e667b;
		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		background-color: #fff;
	}
`;
const DetailImg = styled.img``;
const ItemTitle = styled.p`
	font-size: 1.1rem;
	color: #5e667b;
	letter-spacing: 0.11px;
`;
const ItemDesc = styled.p`
	font-size: 1.2rem;
	color: #2a3349;
	letter-spacing: -0.24px;
`;
const Option = styled.div`
	width: 56rem;
`;
const OptionHeader = styled.div`
	width: 100%;
	display: flex;
`;
const OptionHeaderItem = styled.div`
	:nth-child(1) {
		width: 44%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 20%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5) {
		width: 8%;
		text-align: center;
	}
`;
const OptionBody = styled.ul`
	width: 100%;
	height: 18.1rem;
	padding: 0.8rem 0;
	overflow-y: auto;
	border: 1px solid #e5e6ed;
	border-top: 2px solid #e5e6ed;
	border-bottom: 2px solid #e5e6ed;
`;
const OptionList = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 0.8rem;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const OptionItem = styled.div`
	height: 2rem;
	font-size: 1.2rem;
	color: #2a3349;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 1;
	-moz-line-clamp: 1;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	:nth-child(1) {
		width: 44%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 20%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5) {
		width: 8%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
const OptionIcon = styled.img`
	width: 2.4rem;
	height: 1.7rem;
`;
const RequireList = styled.li`
	height: 3.1rem;
	margin-bottom: 1rem;
	display: flex;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const RequireTitle = styled.p`
	width: 6rem;
	font-size: 1.1rem;
	font-family: 'kr-b';
	color: #5e667b;
	text-align: right;
`;
const RequireDesc = styled(ItemDesc)`
	margin-left: 6rem;
`;
const Buttons = styled.div`
	height: 3.1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: -5.75rem;
	right: 0;
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
	margin-left: 0.8rem;
	:nth-child(1) {
		margin: 0;
	}
	${(props) =>
		props.border &&
		`	color: #2a3349; background-color: unset;
		border: 2px solid #2a3349;`}
	${(props) => props.add && `position:absolute; top:-8.8rem; right:0;`}
`;
