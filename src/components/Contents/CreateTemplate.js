import React, { useEffect, useRef, useState } from 'react';
import { transformToLink } from '../../functions/TransformToLink';
import { extension } from '../../data/extension';
import * as link from '../../data/link';
import * as banner from '../../controller/banner';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const CreateTemplate = (props) => {
	const pageSelect = useRef();
	const partitionSelect = useRef();
	const subPartitionSelect = useRef();
	const pageInit = '페이지를 선택해주세요.';
	const partitionInit = '대분류를 선택해주세요.';
	const subPartitionInit = '소분류를 선택해주세요.';
	const types = ['메인', '광고'];
	const [type, setType] = useState('메인');
	const [title, setTitle] = useState('');
	const [page, setPage] = useState(pageInit);
	const [partition, setPartition] = useState(partitionInit);
	const [subPartition, setSubPartition] = useState(subPartitionInit);
	const [product_id, setProduct_id] = useState('');
	const [img, setImg] = useState(false);
	const [prevImg, setPrevImg] = useState(false);
	const [openSelect, setOpenSelect] = useState(0);
	const [check, setCheck] = useState(false);
	const [subPartitionList, setSubPartitionList] = useState(
		link.partition[0].arr
	);

	useEffect(() => {
		setPartition(partitionInit);
		setProduct_id('');
	}, [page]);

	useEffect(() => {
		setSubPartition(subPartitionInit);
		for (let i = 0; i < link.partition.length; i++) {
			if (link.partition[i].title === partition) {
				return setSubPartitionList(link.partition[i].arr);
			}
		}
	}, [partition]);
	useEffect(() => {
		if (title && img && page !== pageInit) {
			if (page === '상품 카테고리') {
				if (subPartition !== subPartitionInit) {
					setCheck(true);
				} else {
					setCheck(false);
				}
			} else if (page === '상품 상세보기') {
				if (product_id !== '') {
					setCheck(true);
				} else {
					setCheck(false);
				}
			} else {
				setCheck(true);
			}
		} else {
			setCheck(false);
		}
	}, [title, img, page, subPartition, product_id]);

	const typeController = (e) => {
		setType(e.target.innerText);
	};
	const titleController = (e) => {
		setTitle(e.target.value);
	};
	const pageController = (e) => {
		setPage(e.target.innerText);
		setOpenSelect(0);
	};
	const partitionController = (e) => {
		setPartition(e.target.innerText);
		setOpenSelect(0);
	};
	const subPartitionController = (e) => {
		setSubPartition(e.target.innerText);
		setOpenSelect(0);
	};
	const ProductIdController = (e) => {
		setProduct_id(e.target.value);
	};
	const onClick = () => {
		setOpenSelect(0);
	};

	const fileUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setPrevImg(URL.createObjectURL(file[0]));
			setImg(file[0]);
		}
	};
	const onMouseDown = (e) => {
		if (
			openSelect !== 0 &&
			(!pageSelect.current || !pageSelect.current.contains(e.target)) &&
			(!partitionSelect.current ||
				!partitionSelect.current.contains(e.target)) &&
			(!subPartitionSelect.current ||
				!subPartitionSelect.current.contains(e.target))
		) {
			setOpenSelect(0);
		}
	};
	const onCreate = () => {
		if (!check) {
			return alert('빠진 내용을 입력해주세요.');
		} else {
			const formData = new FormData();
			formData.append('image', img);
			formData.append('type', type);
			formData.append('title', title);
			formData.append('page', transformToLink(page));
			if (page === '상품 카테고리') {
				formData.append('partition', partition);
				formData.append('subPartition', subPartition);
			}
			if (page === '상품 상세보기') {
				formData.append('product_id', product_id);
			}
			banner.create(formData).then((res) => {
				console.log(res.data);
				if (res.data.success) {
					alert('배너가 추가되었습니다.');
					if (type === '메인') {
						props.getCategory('메인 배너');
					} else if (type === '광고') {
						props.getCategory('광고 배너');
					}
				}
			});
		}
	};

	const partitionActive = page === '상품 카테고리';
	const subPartitionActive = partition !== '대분류를 선택해주세요.';
	const detailActive = page === '상품 상세보기';

	return (
		<Container onMouseDown={onMouseDown}>
			<Left>
				<Title>타입</Title>
				<Desc>등록 후 수정이 불가능합니다.</Desc>
				<TypeSelectBox>
					{types.map((el, idx) => (
						<TypeSelect
							key={idx}
							select={type === el}
							onClick={typeController}>
							{el}
						</TypeSelect>
					))}
				</TypeSelectBox>
				<Title>제목</Title>
				<Input
					value={title}
					placeholder='제목을 입력해주세요.(최대 45자)'
					onChange={titleController}
				/>
				<Title>링크</Title>
				<Desc>{`배너를 클릭할 시 이동할 페이지 경로를 정합니다.\n특정 상품을 지정하실 경우 올바른 경로를 선택 및 입력해주세요.`}</Desc>
				<Item active>
					<Subtitle>페이지</Subtitle>
					{openSelect !== 1 ? (
						<ItemSelected
							onClick={() => {
								setOpenSelect(1);
							}}>
							<ItemText>{page}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={pageSelect}>
							<ItemSelectList onClick={onClick}>{page}</ItemSelectList>
							{link.page.map((el, idx) => (
								<ItemSelectList key={idx} onClick={pageController}>
									{el}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={partitionActive}>
					<Subtitle>카테고리 - 대분류</Subtitle>
					{openSelect !== 2 ? (
						<ItemSelected
							onClick={() => {
								page === '상품 카테고리' && setOpenSelect(2);
							}}>
							<ItemText>{partition}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={partitionSelect}>
							<ItemSelectList onClick={onClick}>
								{partition}
							</ItemSelectList>
							{link.partition.map((el, idx) => (
								<ItemSelectList key={idx} onClick={partitionController}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={subPartitionActive}>
					<Subtitle>카테고리 - 소분류</Subtitle>
					{openSelect !== 3 ? (
						<ItemSelected
							onClick={() => {
								partition !== partitionInit && setOpenSelect(3);
							}}>
							<ItemText>{subPartition}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={subPartitionSelect}>
							<ItemSelectList onClick={onClick}>
								{subPartition}
							</ItemSelectList>
							{subPartitionList.map((el, idx) => (
								<ItemSelectList
									key={idx}
									onClick={subPartitionController}>
									{el}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={detailActive}>
					<Subtitle>상품</Subtitle>
					<Input
						value={product_id}
						disabled={page !== '상품 상세보기'}
						placeholder='상품의 코드를 입력해주세요.'
						onChange={ProductIdController}
					/>
				</Item>
			</Left>
			<Right>
				<Title>이미지</Title>
				<Desc>{`메인 배너 사이즈 : 1920px ✕ 850px\n광고 배너 사이즈 : 1200px ✕ 350px`}</Desc>
				<UploadImgBox>
					{prevImg && <UploadImg alt='이미지 업로드' src={prevImg} />}
				</UploadImgBox>
				<UploadButtonBox>
					<Button>업로드</Button>
					<FileInput
						type='file'
						accept={extension}
						onChange={fileUpload}
					/>
				</UploadButtonBox>
				<Button
					add
					style={check ? { opacity: '1' } : { opacity: '0.4' }}
					onClick={onCreate}>
					추가하기
				</Button>
			</Right>
		</Container>
	);
};

export default CreateTemplate;

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
	padding: 3.05rem 0 0 0;
	display: flex;
`;
const Left = styled.div`
	width: 50%;
	height: 100%;
`;
const Title = styled.h4`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Subtitle = styled.p`
	margin-bottom: 0.4rem;
	height: 1.6rem;
	line-height: 1.6rem;
	font-size: 1.1rem;
	font-family: 'kr-r';
	color: #5e667b;
	${(props) => (props.active ? `opacity:1` : `opacity:0.4`)}
`;
const Desc = styled.p`
	margin-bottom: 1.2rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #848ca2;
`;
const TypeSelectBox = styled.ul`
	width: 40rem;
	height: 6.2rem;
	line-height: 6.2rem;
	text-align: center;
	margin-bottom: 5rem;
	margin-left: 0.4rem;
	display: flex;
	border: 1px solid #a8b0c3;
	border-radius: 4px;
`;
const TypeSelect = styled.li`
	width: 50%;
	height: 100%;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #5e667b;
	border-radius: 4px;
	${(props) =>
		props.select &&
		`border: 2px solid #5887FF; font-family:'kr-b';color:#111A31;`}
`;
const Input = styled.input`
	margin-top: 1.2rem;
	margin-bottom: 5rem;
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-r';
	color: #7f8697;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
`;
const Item = styled.div`
	padding-bottom: 3.1rem;
	margin-bottom: 1rem;
	position: relative;
	/* border: 1px solid red; */
	${(props) => (props.active ? `opacity:1` : `opacity:0.4`)};
`;
const ItemSelected = styled.div`
	margin-bottom: 1rem;
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	position: absolute;
	padding: 0 1rem;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
`;
const ItemText = styled.p`
	width: 100%;
	font-size: 1.2rem;
	font-family: 'kr-r';
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
	height: 16rem;
	line-height: 3.2rem;
	overflow-y: scroll;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
`;
const ItemSelectList = styled.li`
	height: 3.2rem;
	line-height: 3.2rem;
	padding: 0 0.8rem;
	:nth-child(1) {
		border-bottom: 1px solid #e5e6ed;
	}
	:hover {
		background-color: #e5e6ed;
	}
`;

const Right = styled.div`
	width: 50%;
	height: 100%;
	position: relative;
`;
const UploadImgBox = styled.div`
	width: 53.4rem;
	height: 23.6rem;
	margin-bottom: 1.2rem;
	border: 1px solid #a8b0c3;
	background-color: #f4f4f4;
`;
const UploadImg = styled.img`
	width: 100%;
	height: 100%;
	border: 1px solid #a8b0c3;
`;
const UploadButtonBox = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	background-color: #2a3349;
	border-radius: 4px;
	${(props) => props.add && `position:absolute; right:0; top:-8.8rem;`}
`;
const FileInput = styled.input`
	width: 10.6rem;
	height: 3.1rem;
	position: absolute;
	left: 0;
	opacity: 0;
	z-index: 3;
	border: none;
	background-color: #2a3349;
	border-radius: 4px;
`;
