import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../../config';
import * as productImgController from '../../../controller/product_img';
import extension from '../../../model/extension';
import styled from 'styled-components';

const CreateTemplate = (props) => {
	const history = useHistory();
	const typeItems = ['단일', '공유'];
	const [productImgId, setProductImgId] = useState('');
	const [title, setTitle] = useState('');
	const [share, setShare] = useState(0);
	const [img, setImg] = useState(false);
	const [prevImg, setPrevImg] = useState(false);
	const [check, setCheck] = useState(false);

	const editMode = props.mode === 'edit';

	useEffect(() => {
		if (editMode) {
			productImgController.getDetail(history.location.state).then((res) => {
				if (res.data.success) {
					let product_image = res.data.product_image;
					setProductImgId(product_image.product_image_id);
					setTitle(product_image.title);
					setShare(product_image.share);
					if (product_image.image) {
						setPrevImg(product_image.image);
					}
				}
			});
		}
		// eslint-disable-next-line
	}, [props.mode]);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangeShare = (idx) => {
		editMode || setShare(idx);
	};

	const fileUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setPrevImg(URL.createObjectURL(file[0]));
			setImg(file[0]);
		}
	};

	const onCreate = () => {
		if (!check) {
			return props.setModal({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			const formData = new FormData();
			formData.append('image', img);
			formData.append('title', title);
			formData.append('share', share);
			productImgController.create(formData).then((res) => {
				if (res.data.success) {
					props.setModal({
						type: 'confirm',
						text: '상품 이미지가 등록되었습니다.',
					});
					props.getCategory('이미지 목록');
				}
			});
		}
	};

	const onEdit = () => {
		if (!check) {
			return props.setModal({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			if (img) {
				const formData = new FormData();
				formData.append('image', img);
				formData.append('title', title);
				formData.append('product_image_id', productImgId);
				productImgController
					.edit(formData, productImgId, true)
					.then((res) => {
						res.data.success && successEdit();
					});
			} else {
				const data = { title, productImgId };
				productImgController.edit(data, productImgId, false).then((res) => {
					res.data.success && successEdit();
				});
			}
		}
	};
	const successEdit = () => {
		props.setModal({ type: 'confirm', text: '수정되었습니다.' });
		props.setMode('list');
	};

	const goList = () => {
		props.setMode('list');
	};
	useEffect(() => {
		if (editMode) {
			title ? setCheck(true) : setCheck(false);
		} else {
			title && img ? setCheck(true) : setCheck(false);
		}
		// eslint-disable-next-line
	}, [title, share, img]);

	return (
		<Container>
			<TopWrap>
				<Section>
					<Title>제목</Title>
					<Desc>명확한 제목으로 등록해주세요.</Desc>
					<Input
						defaultValue={title ? title : null}
						placeholder='제목을 입력해주세요. (최대 45자)'
						onChange={onChangeTitle}
					/>
				</Section>
				<Section>
					<Title>타입</Title>
					<Desc>
						단일 이미지는 하나의 상품에, 공유 이미지는 여러 상품에 등록할
						수 있습니다.
					</Desc>
					<TypeBox>
						{typeItems.map((el, idx) => (
							<TypeItem
								key={idx}
								edit={editMode}
								selected={share === idx}
								onClick={() => {
									onChangeShare(idx);
								}}>
								{el}
							</TypeItem>
						))}
					</TypeBox>
				</Section>
			</TopWrap>
			<BottomWrap>
				<Title>이미지</Title>
				<Desc>
					사이즈 : 가로 1200px, 세로 5000px 권장 / 용량 : 10MB 이하 권장 /
					해상도 : 72dpi
				</Desc>
				<UploadButton>업로드</UploadButton>
				<FileInput type='file' accept={extension} onChange={fileUpload} />
				<ImgWrap>
					{!editMode && prevImg && (
						<UploadImg alt='product detail img' src={prevImg} />
					)}
					{editMode && prevImg && (
						<UploadImg
							alt='product detail img'
							src={
								img && prevImg ? prevImg : `${IMG_ADDRESS}/${prevImg}`
							}
						/>
					)}
				</ImgWrap>
			</BottomWrap>
			{editMode ? (
				<Buttons>
					<Button border onClick={goList}>
						취소하기
					</Button>
					<Button onClick={onEdit}>저장하기</Button>
				</Buttons>
			) : (
				<SaveButton active={check} onClick={onCreate}>
					저장하기
				</SaveButton>
			)}
		</Container>
	);
};

export default CreateTemplate;

const Container = styled.div`
	width: 119rem;
	padding-top: 3.05rem;
	position: relative;
`;
const TopWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 21.6rem;
`;
const Section = styled.div`
	:nth-child(1) {
		margin-right: 11.1rem;
	}
`;
const Title = styled.h4`
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Desc = styled.p`
	font-size: 1rem;
	color: #848ca2;
	margin-bottom: 1.2rem;
`;
const Input = styled.input`
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	color: #7f8697;
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
	${(props) =>
		props.selected
			? `color:#2A3349; font-family:'kr-b'; 
				border:2px solid #5887FF;`
			: `color: #5E667B;  `}
	${({ edit, selected }) => {
		return edit && selected
			? `border:2px solid #848CA2`
			: edit && !selected
			? `border:none`
			: null;
	}}
`;
const UploadButton = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
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
const SaveButton = styled.button`
	width: 10.6rem;
	height: 3.1rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #fff;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	position: absolute;
	top: -5.75rem;
	right: 0;
	${(props) => !props.active && `opacity:0.4`}
`;
const BottomWrap = styled.div`
	width: 100%;
	position: relative;
`;
const FileInput = styled.input`
	width: 10.6rem;
	height: 3.1rem;
	position: absolute;
	left: 0;
	opacity: 0;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	cursor: pointer;
`;
const ImgWrap = styled.div`
	margin-top: 2rem;
	width: 100%;
	min-height: 50rem;
	border: 1px solid #a8b0c3;
`;
const UploadImg = styled.img`
	width: 100%;
	height: 100%;
`;
