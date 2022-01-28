import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { extension } from '../../data/extension';
import { IMG_ADDRESS } from '../../config';
import * as link from '../../data/link';
import * as _banner from '../../controller/banner';
import styled from 'styled-components';
import down from '../../images/angle-down.svg';

const CreateTemplate = (props) => {
	const history = useHistory();
	const pageSelect = useRef();
	const partSelect = useRef();
	const subPartSelect = useRef();
	const types = ['메인', '광고'];
	const [type, setType] = useState('메인');
	const [banner_id, setBanner_id] = useState('');
	const [title, setTitle] = useState('');
	const [page, setPage] = useState('');
	const [part, setPart] = useState('');
	const [subPart, setSubPart] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [img, setImg] = useState(false);
	const [prevImg, setPrevImg] = useState(false);
	// const [newPrevImg, setNewPrevImg] = useState(false);
	const [openSelect, setOpenSelect] = useState(false);
	const [check, setCheck] = useState(false);
	const [subPartList, setSubPartList] = useState(link.part[0].arr);

	const editMode = props.mode === 'edit';

	useEffect(() => {
		if (part) {
			for (let i = 0; i < link.part.length; i++) {
				if (link.part[i].title === part) {
					return setSubPartList(link.part[i].arr);
				}
			}
		}
	}, [part]);

	useEffect(() => {
		let isSubscribed = true;
		if (editMode && history.location.state) {
			_banner.get_detail(history.location.state).then((res) => {
				if (isSubscribed && res.data.success) {
					let banner = res.data.banner;
					setBanner_id(banner.banner_id);
					setType(banner.type);
					setTitle(banner.title);
					setPage(banner.page);
					if (banner.image) {
						setPrevImg(banner.image);
					}
					if (banner.page === '상품 카테고리') {
						setPart(banner.part);
						setSubPart(banner.subPart);
					} else if (banner.page === '상품 상세보기') {
						setProduct_id(banner.product_id);
					}
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.mode, props.input]);

	useEffect(() => {
		if ((!editMode && title && img && page) || (editMode && title && page)) {
			if (page === '상품 카테고리') {
				subPart ? setCheck(true) : setCheck(false);
			} else if (page === '상품 상세보기') {
				product_id ? setCheck(true) : setCheck(false);
			} else {
				setCheck(true);
			}
		} else {
			setCheck(false);
		}
	}, [title, img, page, subPart, product_id]);

	const onChangeType = (e) => {
		setType(e.target.innerText);
	};
	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangePage = (e) => {
		setPage(e.target.innerText);
		setOpenSelect(0);
	};
	const onChangePart = (e) => {
		if (part !== e.target.innerText) {
			setPart(e.target.innerText);
			setSubPart(false);
		}
		setOpenSelect(0);
	};
	const onChangeSubPart = (e) => {
		setSubPart(e.target.innerText);
		setOpenSelect(0);
	};
	const onChangeProductId = (e) => {
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
		openSelect !== 0 &&
			(!pageSelect.current || !pageSelect.current.contains(e.target)) &&
			(!partSelect.current || !partSelect.current.contains(e.target)) &&
			(!subPartSelect.current ||
				!subPartSelect.current.contains(e.target)) &&
			setOpenSelect(0);
	};
	const onSubmit = (e) => {
		const innerText = e.target.innerText;
		if (innerText === '취소하기') {
			props.changeMode('detail');
		} else if (innerText === '추가하기') {
			onCreate();
		} else if (innerText === '저장하기') {
			onEdit();
		}
	};
	const onCreate = () => {
		if (!check) {
			props.modalController({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			const formData = new FormData();
			formData.append('image', img);
			formData.append('type', type);
			formData.append('title', title);
			formData.append('page', page);
			formData.append('part', part);
			formData.append('subPart', subPart);
			formData.append('product_id', product_id);
			_banner.create(formData).then((res) => {
				if (res.data.success) {
					props.modalController({
						type: 'confirm',
						text: '배너가 추가되었습니다.',
					});
					if (type === '메인') {
						props.getCategory('메인 배너');
					} else if (type === '광고') {
						props.getCategory('광고 배너');
					}
				}
			});
		}
	};
	const onEdit = () => {
		if (!check) {
			props.modalController({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			if (img) {
				const formData = new FormData();
				formData.append('image', img);
				formData.append('type', type);
				formData.append('title', title);
				formData.append('page', page);
				formData.append('part', part);
				formData.append('subPart', subPart);
				formData.append('product_id', product_id);
				_banner.edit(formData, banner_id).then((res) => {
					res.data.success && successEdit();
				});
			} else {
				const data = { type, title, page, part, subPart, product_id };
				_banner.edit(data, banner_id).then((res) => {
					res.data.success && successEdit();
				});
			}
		}
		const successEdit = () => {
			props.modalController({ type: 'confirm', text: '수정되었습니다.' });
			props.changeMode('list');
		};
	};

	const pageInit = '페이지를 선택해주세요.';
	const partInit = '대분류를 선택해주세요.';
	const subPartInit = '소분류를 선택해주세요.';

	const partActive = page === '상품 카테고리';
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
							onClick={editMode ? null : onChangeType}>
							{el}
						</TypeSelect>
					))}
				</TypeSelectBox>
				<Title>제목</Title>
				<Input
					defaultValue={title ? title : null}
					placeholder='제목을 입력해주세요.(최대 45자)'
					onChange={onChangeTitle}
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
							<ItemText>{page ? page : pageInit}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={pageSelect}>
							<ItemSelectList onClick={onClick}>
								{page ? page : pageInit}
							</ItemSelectList>
							{link.page.map((el, idx) => (
								<ItemSelectList key={idx} onClick={onChangePage}>
									{el}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={partActive}>
					<Subtitle>카테고리 - 대분류</Subtitle>
					{openSelect !== 2 ? (
						<ItemSelected
							onClick={() => {
								page === '상품 카테고리' && setOpenSelect(2);
							}}>
							<ItemText>{part ? part : partInit}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={partSelect}>
							<ItemSelectList onClick={onClick}>
								{part ? part : partInit}
							</ItemSelectList>
							{link.part.map((el, idx) => (
								<ItemSelectList key={idx} onClick={onChangePart}>
									{el.title}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={partActive}>
					<Subtitle>카테고리 - 소분류</Subtitle>
					{openSelect !== 3 ? (
						<ItemSelected
							onClick={() => {
								!part
									? props.modalController({
											type: 'confirm',
											text: '대분류를 먼저 선택해주세요.',
									  })
									: setOpenSelect(3);
							}}>
							<ItemText>{subPart ? subPart : subPartInit}</ItemText>
							<ItemSelectImg alt='select button' src={down} />
						</ItemSelected>
					) : (
						<ItemSelectWrap ref={subPartSelect}>
							<ItemSelectList onClick={onClick}>
								{subPart ? subPart : subPartInit}
							</ItemSelectList>
							{subPartList.map((el, idx) => (
								<ItemSelectList key={idx} onClick={onChangeSubPart}>
									{el}
								</ItemSelectList>
							))}
						</ItemSelectWrap>
					)}
				</Item>
				<Item active={detailActive}>
					<Subtitle>상품</Subtitle>
					<Input
						defaultValue={product_id ? product_id : null}
						disabled={page !== '상품 상세보기'}
						placeholder='상품의 코드를 입력해주세요.'
						onChange={onChangeProductId}
					/>
				</Item>
			</Left>
			<Right>
				<Title>이미지</Title>
				<Desc>{`메인 배너 사이즈 : 1920px ✕ 850px\n광고 배너 사이즈 : 1200px ✕ 350px`}</Desc>
				<UploadImgBox>
					{!editMode && prevImg && (
						<UploadImg alt='img upload' src={prevImg} />
					)}
					{editMode && prevImg && (
						<UploadImg
							alt='img upload'
							w
							src={
								img && prevImg ? prevImg : `${IMG_ADDRESS}/${prevImg}`
							}
						/>
					)}
				</UploadImgBox>
				<UploadButtonBox>
					<Button>업로드</Button>
					<FileInput
						type='file'
						accept={extension}
						onChange={fileUpload}
					/>
				</UploadButtonBox>
				{editMode && (
					<Buttons>
						<Button border onClick={onSubmit}>
							취소하기
						</Button>
						<Button onClick={onSubmit}>저장하기</Button>
					</Buttons>
				)}
				{editMode || (
					<Button
						add
						style={check ? { opacity: '1' } : { opacity: '0.4' }}
						onClick={onSubmit}>
						추가하기
					</Button>
				)}
			</Right>
		</Container>
	);
};

export default withRouter(CreateTemplate);

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
	padding: 3.05rem 0 0 0;
	display: flex;
	position: relative;
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
	color: #5e667b;
	${(props) => (props.active ? `opacity:1` : `opacity:0.4`)}
`;
const Desc = styled.p`
	margin-bottom: 1.2rem;
	font-size: 1rem;
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
	color: #5e667b;
	border-radius: 4px;
	cursor: pointer;
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
	color: #7f8697;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
`;
const Item = styled.div`
	padding-bottom: 3.1rem;
	margin-bottom: 1rem;
	position: relative;
	${(props) => (props.active ? `opacity:1` : `opacity:0.4`)};
`;
const ItemSelected = styled.div`
	margin-bottom: 1rem;
	padding: 0 1rem;
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	display: flex;
	align-items: center;
	position: absolute;
	background-color: #f4f4f4;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
	cursor: pointer;
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
	height: 16rem;
	line-height: 3.2rem;
	position: absolute;
	z-index: 3;
	background-color: #fff;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #2a3349;
	border-radius: 4px;
	overflow-y: scroll;
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
	height: 3.2rem;
	line-height: 3.2rem;
	padding: 0 0.8rem;
	cursor: pointer;
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
	cursor: pointer;
`;
const Buttons = styled.div`
	height: 3.1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: -8.8rem;
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
