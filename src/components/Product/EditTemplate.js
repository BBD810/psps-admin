import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { priceToString } from '../../functions/PriceToString';
import { IMG_ADDRESS } from '../../config';
import * as _product_option from '../../controller/product_option';
import * as _product_img from '../../controller/product_img';
import * as _product from '../../controller/product';
import * as _supplier from '../../controller/supplier';
import * as category from '../../data/link';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';
import order_icon from '../../images/order_icon.svg';
import empty_icon from '../../images/empty_icon.svg';
import check_icon from '../../images/check_icon.svg';
import delete_icon from '../../images/delete_icon.svg';
import add_detail from '../../images/add_detail.svg';
import StateInfo from './StateInfo';
import Spinner from '../Spinner';

const EditTemplate = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const partBox = useRef();
	const subPartBox = useRef();
	const supplierBox = useRef();
	const [title, setTitle] = useState('');
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('과일/수입청과');
	const partList = category.part;
	const [subPartList, setSubPartList] = useState([]);
	const [partOpen, setPartOpen] = useState(0);

	const [optionList, setOptionList] = useState([]);
	const [thumbnailImg, setThumbnailImg] = useState(false);
	const [thumbnailPrevImg, setThumbnailPrevImg] = useState(false);
	const [detailImgId, setDetailImgId] = useState(false);
	const [detailPrevImg, setDetailPrevImg] = useState(false);

	const [supplier, setSupplier] = useState('');
	const [supplierOpen, setSupplierOpen] = useState(false);
	const [supplierList, setSupplierList] = useState([]);

	const [origin, setOrigin] = useState('');
	const [storage, setStorage] = useState('');
	const [product_id, setProduct_id] = useState('');

	const [check, setCheck] = useState(false);

	useEffect(() => {
		let isSubscribed = true;
		_supplier.get_list(0).then((res) => {
			if (isSubscribed && res.data.success) {
				setSupplierList(res.data.supplier_list);
			}
		});
		return () => {
			history.replace();
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setIsLoading(true);
		let isSubscribed = true;
		if (history.location.state) {
			_product.get_detail(history.location.state).then((res) => {
				if (isSubscribed && res.data.success) {
					let product = res.data.product;
					setProduct_id(product.product_id);
					setTitle(product.title);
					setPart(product.part);
					setSubPart(product.subPart);
					setOrigin(product.origin);
					setStorage(product.storage);
					setThumbnailPrevImg(product.temp_image);
					setDetailImgId(product.product_image_id);
					setDetailPrevImg(product.temp_detail_image);
					setSupplier(res.data.supplier);
					setOptionList(res.data.product_option_list);
				}
			});
		}
		setIsLoading(false);
		return () => {
			isSubscribed = false;
		};
	}, [props.mode, history.location.state]);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangePart = (e) => {
		const innerText = e.target.innerText;
		part !== innerText && setPart(innerText);
		setPartOpen(0);
	};
	const onChangeSubPart = (e) => {
		const innerText = e.target.innerText;
		subPart !== innerText && setSubPart(innerText);
		setPartOpen(0);
	};
	const onChangeSupplier = (e) => {
		supplier.supplier_id !== e.supplier_id && setSupplier(e);
		setSupplierOpen(false);
	};
	const onChangeOrigin = (e) => {
		setOrigin(e.target.value);
	};
	const onChangeStorage = (e) => {
		setStorage(e.target.value);
	};

	const thumbnailUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setThumbnailPrevImg(URL.createObjectURL(file[0]));
			setThumbnailImg(file[0]);
		}
	};

	useEffect(() => {
		for (let i = 0; i < category.part.length; i++) {
			if (part === category.part[i].title) {
				setSubPart(category.part[i].arr[0]);
				setSubPartList(category.part[i].arr);
			}
		}
	}, [part]);

	const addOption = () => {
		props.setModal({ type: 'option', act: 'add' });
	};
	const editOption = (data, idx) => {
		props.setModal({ type: 'option', act: 'edit', data, order: idx });
	};
	const displayOption = (e) => {
		setIsLoading(true);
		const id = e.product_option_id;
		_product_option.change_display(id).then((res) => {
			if (res.data.success) {
				setOptionList(res.data.product_option_list);
			}
		});
		setIsLoading(false);
	};
	const soldOutOption = (e) => {
		setIsLoading(true);
		const id = e.product_option_id;
		_product_option.change_stock(id).then((res) => {
			if (res.data.success) {
				setOptionList(res.data.product_option_list);
			}
		});
		setIsLoading(false);
	};
	const allSoldOutOption = () => {
		_product.change_all_sold_out(product_id).then((res) => {
			if (res.data.success) {
				setOptionList(res.data.product_option_list);
			}
		});
	};
	const deleteOption = (e) => {
		props.setModal({
			type: 'select',
			text: '상품 옵션을 삭제하시겠습니까?',
			act: 'delete',
			target: e.product_option_id,
		});
	};

	const optionOrderInEdit = (idx) => {
		setIsLoading(true);
		if (idx + 1 !== optionList.length) {
			let arr = [optionList[idx], optionList[idx + 1]];
			_product_option.change_order(arr).then((res) => {
				if (res.data.success) {
					setOptionList(res.data.product_option_list);
				}
			});
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const _modal = props.modal;
		if (_modal.act === 'add' && _modal.return) {
			_product_option.create(_modal.return, product_id).then((res) => {
				if (res.data.success) {
					setOptionList(res.data.product_option_list);
					props.setModal({
						type: 'confirm',
						text: '옵션이 추가되었습니다.',
					});
				}
			});
		} else if (_modal.act === 'edit' && _modal.return) {
			_product_option
				.edit(_modal.return, _modal.data.product_option_id)
				.then((res) => {
					setOptionList(res.data.product_option_list);
					props.setModal({
						type: 'confirm',
						text: '옵션이 수정되었습니다.',
					});
				});
		} else if (_modal.act === 'delete' && _modal.return) {
			_product_option.remove(_modal.target).then((res) => {
				if (res.data.success) {
					setOptionList(res.data.product_option_list);
					props.setModal({
						type: 'confirm',
						text: '삭제되었습니다.',
					});
				} else {
					props.setModal({
						type: 'confirm',
						text: '노출중이거나 추천중인 상품은\n최소 1개 이상의 노출중인 옵션이 있어야합니다.',
					});
				}
			});
		}
		// eslint-disable-next-line
	}, [props.modal.type]);

	useEffect(() => {
		// 모달을 통한 상세이미지 변경
		if (history.location.state) {
			setDetailImgId(history.location.state);
			_product_img.get_detail(history.location.state).then((res) => {
				if (res.data.success) {
					setDetailPrevImg(res.data.product_image.image);
					history.replace();
				}
			});
		}
		// eslint-disable-next-line
	}, [history.location.state]);

	const goList = () => {
		props.setMode('list');
	};

	const onEdit = () => {
		setIsLoading(true);
		if (!check) {
			props.setModal({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.\n상품 옵션도 최소 1개 등록해야 합니다.',
			});
		} else if (
			!title ||
			!part ||
			!subPart ||
			optionList.length < 1 ||
			!supplier.supplier_id
		) {
			props.setModal({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else if (thumbnailImg) {
			const formData = new FormData();
			formData.append('product_id', product_id);
			formData.append('image', thumbnailImg);
			formData.append('title', title);
			formData.append('part', part);
			formData.append('subPart', subPart);
			formData.append('origin', origin);
			formData.append('storage', storage);
			formData.append('supplier_id', supplier.supplier_id);
			formData.append('product_image_id', detailImgId);
			_product.edit(product_id, formData).then((res) => {
				res.data.success && editSuccess();
			});
		} else if (!thumbnailImg) {
			const data = {
				product_id,
				part,
				subPart,
				title,
				storage,
				origin,
				supplier_id: supplier.supplier_id,
				product_image_id: detailImgId,
			};
			_product.edit(product_id, data).then((res) => {
				res.data.success && editSuccess();
			});
		}
		setIsLoading(false);
	};
	const editSuccess = () => {
		props.setMode('list');
		props.setModal({
			type: 'confirm',
			text: '수정되었습니다.',
		});
	};

	const openImgListModal = () => {
		props.setModal({
			type: 'img_list',
			text: '상품 상세 이미지를 선택해주세요.',
		});
	};

	const onMouseDown = (e) => {
		partOpen !== 0 &&
			(!partBox.current || !partBox.current.contains(e.target)) &&
			(!subPartBox.current || !subPartBox.current.contains(e.target)) &&
			setPartOpen(0);
		supplierOpen &&
			(!supplierBox.current || !supplierBox.current.contains(e.target)) &&
			setSupplierOpen(false);
	};

	useEffect(() => {
		title &&
		part &&
		subPart &&
		optionList.length > 0 &&
		detailImgId &&
		supplier &&
		origin &&
		storage
			? setCheck(true)
			: setCheck(false);
	}, [
		title,
		part,
		subPart,
		optionList,
		detailImgId,
		supplier,
		origin,
		storage,
	]);

	return (
		<Container>
			{isLoading && <Spinner />}
			<StateInfo
				active={false}
				mode={props.mode}
				modal={props.modal}
				setModal={props.setModal}
				product_id={product_id}
			/>
			<BasicInfo onMouseDown={onMouseDown}>
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
								<TitleInput
									value={title ? title : ''}
									placeholder='상품명을 입력해주세요.'
									onChange={onChangeTitle}
								/>
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
										{partOpen === 1 ? (
											<ItemSelectWrap main={true} ref={partBox}>
												<ItemSelectList>
													{part && part}
												</ItemSelectList>
												{partList.map((el, idx) => (
													<ItemSelectList
														key={idx}
														onClick={onChangePart}>
														{el.title}
													</ItemSelectList>
												))}
											</ItemSelectWrap>
										) : (
											<ItemSelected
												main={true}
												onClick={() => {
													setPartOpen(1);
												}}>
												<ItemText>
													{part && `대분류 - ${part}`}
												</ItemText>
												<ItemSelectImg
													alt='select button'
													src={down}
												/>
											</ItemSelected>
										)}
									</Item>
									<Item>
										{partOpen === 2 ? (
											<ItemSelectWrap sub={true} ref={subPartBox}>
												<ItemSelectList>
													{subPart && subPart}
												</ItemSelectList>
												{subPartList.map((el, idx) => (
													<ItemSelectList
														key={idx}
														onClick={onChangeSubPart}>
														{el}
													</ItemSelectList>
												))}
											</ItemSelectWrap>
										) : (
											<ItemSelected
												sub={true}
												onClick={() => {
													setPartOpen(2);
												}}>
												<ItemText>
													{subPart && `소분류 - ${subPart}`}
												</ItemText>
												<ItemSelectImg
													alt='select button'
													src={down}
												/>
											</ItemSelected>
										)}
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
											'삭제',
											'순서',
										].map((el, idx) => (
											<OptionHeaderItem key={idx}>
												{el}
											</OptionHeaderItem>
										))}
									</OptionHeader>
									<OptionBody>
										{optionList.map((el, idx) => (
											<OptionList key={idx}>
												<OptionItem
													soldOut={!el.stock}
													onClick={() => {
														editOption(el, idx);
													}}>
													{el.title}
												</OptionItem>
												<OptionItem
													soldOut={!el.stock}
													onClick={() => {
														editOption(el, idx);
													}}>
													{priceToString(el.price)}
												</OptionItem>
												<OptionItem
													soldOut={!el.stock}
													onClick={() => {
														editOption(el, idx);
													}}>
													{priceToString(el.price - el.discount)}
												</OptionItem>
												<OptionItem>
													<OptionIcon
														alt='icon'
														src={
															el.state === 'O'
																? check_icon
																: empty_icon
														}
														onClick={() => {
															displayOption(el);
														}}
													/>
												</OptionItem>
												<OptionItem>
													<OptionIcon
														alt='icon'
														src={
															el.stock ? empty_icon : check_icon
														}
														onClick={() => {
															soldOutOption(el);
														}}
													/>
												</OptionItem>
												<OptionItem>
													<OptionIcon
														alt='icon'
														src={delete_icon}
														onClick={() => {
															deleteOption(el);
														}}
													/>
												</OptionItem>
												<OptionItem>
													<OptionIcon
														alt='icon'
														src={order_icon}
														onClick={() => {
															optionOrderInEdit(idx);
														}}
													/>
												</OptionItem>
											</OptionList>
										))}
									</OptionBody>
								</Option>

								<OptionButtons>
									<OptionButton filled onClick={addOption}>
										추가하기
									</OptionButton>
									<OptionButton border onClick={allSoldOutOption}>
										일괄품절
									</OptionButton>
								</OptionButtons>
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
								{thumbnailPrevImg && (
									<ThumbnailImg
										alt=''
										src={
											thumbnailImg
												? thumbnailPrevImg
												: `${IMG_ADDRESS}/${thumbnailPrevImg}`
										}
									/>
								)}
								<ThumbnailInput
									type='file'
									onChange={thumbnailUpload}
								/>
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
									<DetailImg
										alt=''
										src={
											detailPrevImg
												? `${IMG_ADDRESS}/${detailPrevImg}`
												: add_detail
										}
										onClick={openImgListModal}
									/>
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
								<Item>
									{supplierOpen ? (
										<ItemSelectWrap ref={supplierBox}>
											<ItemSelectList>
												{supplier.name
													? supplier.name
													: '공급원을 선택해주세요.'}
											</ItemSelectList>
											{supplierList.map((el, idx) => (
												<ItemSelectList
													key={idx}
													onClick={() => {
														onChangeSupplier(el);
													}}>
													{el.name}
												</ItemSelectList>
											))}
										</ItemSelectWrap>
									) : (
										<ItemSelected
											onClick={() => {
												setSupplierOpen(true);
											}}>
											<ItemText>
												{supplier.name
													? supplier.name
													: '공급원을 선택해주세요.'}
											</ItemText>
											<ItemSelectImg
												alt='select button'
												src={down}
											/>
										</ItemSelected>
									)}
								</Item>
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
									<RequireInput
										value={origin ? origin : ''}
										placeholder='원산지를 입력해주세요.'
										onChange={onChangeOrigin}
									/>
								</RequireList>
								<RequireList>
									<RequireTitle>보관방법</RequireTitle>
									<RequireInput
										value={storage ? storage : ''}
										placeholder='보관방법을 입력해주세요.'
										onChange={onChangeStorage}
									/>
								</RequireList>
							</RightInner>
						</Right>
					</Content>
				</Body>
			</BasicInfo>
			<Buttons>
				<Button border onClick={goList}>
					취소하기
				</Button>
				<Button active={check} filled onClick={onEdit}>
					저장하기
				</Button>
			</Buttons>
		</Container>
	);
};

export default withRouter(EditTemplate);

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
const TitleInput = styled.input`
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	color: #7f8697;
`;
const Option = styled.div`
	width: 56rem;
	width: 60.4rem;
`;
const OptionHeader = styled.div`
	width: 100%;
	display: flex;
`;
const OptionHeaderItem = styled.div`
	:nth-child(1) {
		width: 38%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 17%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5),
	:nth-child(6),
	:nth-child(7) {
		width: 7%;
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
	cursor: pointer;
	:nth-child(1) {
		width: 38%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 17%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5),
	:nth-child(6),
	:nth-child(7) {
		width: 7%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	${(props) => props.soldOut && `text-decoration : line-through`}
`;
const OptionIcon = styled.img`
	width: 2.4rem;
	height: 1.7rem;
	/* cursor: pointer; */
`;
const OptionButtons = styled.div`
	width: 10.6rem;
	margin-left: 16.6rem;
`;
const OptionButton = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	margin-bottom: 1rem;
	:nth-last-child(1) {
		margin: 0;
	}
	${(props) =>
		props.filled
			? `background-color:#2A3349; color:#fff;`
			: `background-color:unset; border: 2px solid #2A3349; color:#2A3349; opacity:0.4;`}
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
const ItemSelected = styled.div`
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
	position: absolute;
	top: -1rem;
`;
const ItemText = styled.p`
	width: 100%;
	font-size: 1.2rem;
	color: #7f8697;
`;
const ItemSelectImg = styled.img`
	width: 0.7rem;
	height: 0.6rem;
	position: absolute;
	right: 1rem;
`;
const ItemSelectWrap = styled.ul`
	width: 20rem;
	max-height: 16rem;
	line-height: 3.1rem;
	position: absolute;
	top: -1rem;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: auto;
`;
const ItemSelectList = styled.li`
	height: 3.1rem;
	line-height: 3.1rem;
	padding: 0 0.8rem;
	cursor: pointer;
	:nth-child(1) {
		border-bottom: 1px solid #e5e6ed;
	}
	:hover {
		background-color: #e5e6ed;
	}
`;
const ThumbnailImg = styled.img`
	width: 17.7rem;
	height: 16.3rem;
`;
const ThumbnailInput = styled.input`
	width: 17.7rem;
	height: 16.3rem;
	position: absolute;
	left: 4rem;
	opacity: 0;
	z-index: 3;
	cursor: pointer;
`;
const DetailImgWrap = styled.div`
	width: 56rem;
	height: 24.8rem;
	overflow: hidden;
`;
const DetailImg = styled.img`
	cursor: pointer;
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
	width: 10rem;
	font-size: 1.1rem;
	font-family: 'kr-b';
	color: #5e667b;
	text-align: right;
`;
const RequireInput = styled.input`
	margin-left: 6rem;
	width: 44rem;
	height: 3.1rem;
	font-size: 1.2rem;
	color: #7f8697;
`;

const Buttons = styled.div`
	display: flex;
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
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	${(props) =>
		props.border &&
		`margin-right:0.8rem; border:2px solid #2A3349; background-color:#fff; color:#2A3349`}
	${(props) => props.filled && !props.active && `opacity:0.4`}
`;
