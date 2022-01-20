import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as supplier from '../../controller/supplier';
import * as category from '../../data/link';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';
import empty_icon from '../../images/empty_icon.svg';
import edit_icon from '../../images/edit_icon.svg';
import check_icon from '../../images/checked_icon.svg';
import delete_icon from '../../images/delete_icon.svg';
import add_detail from '../../images/add_detail.svg';
import add_thumbnail from '../../images/add_thumbnail.svg';

const BasicInfo = (props) => {
	const [title, setTitle] = useState('');
	const partBox = useRef();
	const subPartBox = useRef();
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('과일/수입청과');
	const [partList, setPartList] = useState(category.part);
	const [subPartList, setSubPartList] = useState([]);
	const [partOpen, setPartOpen] = useState(0);

	const [optionList, setOptionList] = useState([]);

	const [thumbnailImg, setThumbnailImg] = useState(false);
	const [thumbnailPrevImg, setThumbnailPrevImg] = useState(false);
	const [detailImg, setDetailImg] = useState(false);
	const [detailPrevImg, setDetailPrevImg] = useState(false);

	const [supplier_id, setSupplier_id] = useState('');
	const [supplierOpen, setSupplierOpen] = useState(false);
	const [supplierList, setSupplierList] = useState([]);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};

	useEffect(() => {
		let isSubscribed = true;
		supplier.get_list(0).then((res) => {
			if (isSubscribed && res.data.success) {
				setSupplierList(res.data.supplier_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	const optionHeaderList = [
		'옵션명',
		'기존가',
		'판매가',
		'수정',
		'품절',
		'삭제',
	];

	const onChangePart = (e) => {
		if (part !== e.target.innerText) {
			setPart(e.target.innerText);
		}
		setPartOpen(0);
	};
	const onChangeSubPart = (e) => {
		if (subPart !== e.target.innerText) {
			setSubPart(e.target.innerText);
		}
		setPartOpen(0);
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
		props.modalController({ type: 'option', act: 'add' });
	};

	const thumbnailUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setThumbnailPrevImg(URL.createObjectURL(file[0]));
			setThumbnailImg(file[0]);
		}
	};
	const detailUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setDetailPrevImg(URL.createObjectURL(file[0]));
			setDetailImg(file[0]);
		}
	};

	useEffect(() => {
		if (props.modal.act === 'add' && props.modal.return) {
			setOptionList([...optionList, props.modal.return]);
			props.modalController({ type: '' });
		}
	}, [props.modal.type]);

	return (
		<Container>
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
												{part && `${part}`}
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
												{part && `대분류 · ${part}`}
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
												{subPart && `${subPart}`}
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
												{subPart && `소분류 · ${subPart}`}
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
									{optionHeaderList.map((el, idx) => (
										<OptionHeaderItem key={idx}>
											{el}
										</OptionHeaderItem>
									))}
								</OptionHeader>
								<OptionBody>
									{optionList.map((el, idx) => (
										<OptionList key={idx}>
											<OptionItem>{el.title}</OptionItem>
											<OptionItem>{el.price}</OptionItem>
											<OptionItem>
												{el.price - el.discount}
											</OptionItem>
											<OptionItem>
												<OptionIcon alt='icon' src={edit_icon} />
											</OptionItem>
											<OptionItem>
												<OptionIcon alt='icon' src={check_icon} />
											</OptionItem>
											<OptionItem>
												<OptionIcon alt='icon' src={delete_icon} />
											</OptionItem>
										</OptionList>
									))}
								</OptionBody>
							</Option>

							<Buttons>
								<Button filled onClick={addOption}>
									추가하기
								</Button>
								<Button border>일괄품절</Button>
							</Buttons>
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
							<ThumbnailImg
								alt=''
								src={
									thumbnailPrevImg ? thumbnailPrevImg : add_thumbnail
								}
							/>
							<ThumbnailInput type='file' onChange={thumbnailUpload} />
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
							<DetailImg
								alt=''
								src={detailPrevImg ? detailPrevImg : add_detail}
							/>
							<DetailInput type='file' onChange={detailUpload} />
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
									<ItemSelectWrap sub={true} ref={subPartBox}>
										<ItemSelectList>
											{subPart && `${subPart}`}
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
											setSupplierOpen(false);
										}}>
										<ItemText>
											{subPart && `소분류 · ${subPart}`}
										</ItemText>
										<ItemSelectImg alt='select button' src={down} />
									</ItemSelected>
								)}
							</Item>
						</RightInner>
					</Right>
				</Content>
				<Content style={{ height: '29.6rem' }}>
					<Left>
						<LeftInner>
							<Title>상품 정보</Title>
							<Desc>{`상품의 필수 표기정보를 등록합니다.`}</Desc>
						</LeftInner>
					</Left>
					<Right>
						<RightInner>
							<RequireList>
								<RequireTitle>품목명</RequireTitle>
								<RequireInput placeholder='품목명을 입력해주세요.' />
							</RequireList>
							<RequireList>
								<RequireTitle>내용량 / 중량</RequireTitle>
								<RequireInput placeholder='내용량 / 중량을 입력해주세요.' />
							</RequireList>
							<RequireList>
								<RequireTitle>원산지</RequireTitle>
								<RequireInput placeholder='원산지를 입력해주세요.' />
							</RequireList>
							<RequireList>
								<RequireTitle>유통기한</RequireTitle>
								<RequireInput placeholder='유통기한을 입력해주세요.' />
							</RequireList>
							<RequireList>
								<RequireTitle>보관방법</RequireTitle>
								<RequireInput placeholder='보관방법을 입력해주세요.' />
							</RequireList>
							<RequireList>
								<RequireTitle>품목명</RequireTitle>
								<RequireInput placeholder='품목명을 입력해주세요.' />
							</RequireList>
						</RightInner>
					</Right>
				</Content>
			</Body>
		</Container>
	);
};

export default BasicInfo;

const Container = styled.div`
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
const Right = styled(LeftInner)`
	width: 91rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RightInner = styled.div`
	margin: 2rem 0 2.7rem;
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
	padding: 0 1rem;
`;
const Option = styled.div`
	width: 56rem;
`;
const OptionHeader = styled.div`
	width: 100%;
	display: flex;
	${(props) => props.scroll}
`;
const OptionHeaderItem = styled.div`
	:nth-child(1) {
		width: 40%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 18%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5),
	:nth-child(6) {
		width: 8%;
		text-align: center;
	}
`;
const OptionBody = styled.ul`
	width: 100%;
	height: 18.1rem;
	padding: 0.8rem 0;
	overflow-y: auto;
	border-top: 2px solid #e5e6ed;
	border-bottom: 2px solid #e5e6ed;
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #5e667b;
		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		background-color: #fff;
	}
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
	font-size: 1.2rem;
	color: #2a3349;
	:nth-child(1) {
		width: 40%;
		padding-left: 1rem;
	}
	:nth-child(2),
	:nth-child(3) {
		width: 18%;
		text-align: center;
	}
	:nth-child(4),
	:nth-child(5),
	:nth-child(6) {
		width: 8%;
		text-align: center;
	}
`;
const OptionIcon = styled.img`
	width: 2.4rem;
	height: 1.7rem;
`;
const Buttons = styled.div`
	width: 10.6rem;
	margin-left: 16.6rem;
`;
const Button = styled.button`
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
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #5e667b;
		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		background-color: #fff;
	}
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
	left: 0;
	opacity: 0;
	z-index: 3;
	cursor: pointer;
`;
const DetailImg = styled.img`
	width: 56rem;
	height: 24.8rem;
`;
const DetailInput = styled.input`
	width: 56rem;
	height: 24.8rem;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	z-index: 3;
	cursor: pointer;
	border: 2px solid red;
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
	padding: 0 1rem;
	width: 44rem;
	height: 3.1rem;
	font-size: 1.2rem;
	color: #7f8697;
`;
