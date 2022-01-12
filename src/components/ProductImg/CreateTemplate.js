import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { extension } from '../../data/extension';
import { IMG_ADDRESS } from '../../config';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';

const CreateTemplate = (props) => {
	const history = useHistory();
	const shareItems = ['단일', '공유'];
	const [product_image_id, setProduct_image_id] = useState('');
	const [title, setTitle] = useState('');
	const [share, setShare] = useState(0);
	const [img, setImg] = useState(false);
	const [prevImg, setPrevImg] = useState(false);
	const [check, setCheck] = useState(false);

	const editMode = props.mode === 'edit';

	useEffect(() => {
		if (editMode) {
			product_img.get_detail(history.location.state).then((res) => {
				if (res.data.success) {
					console.log(res.data);
					let product_image = res.data.product_image;
					setProduct_image_id(product_image.product_image_id);
					setTitle(product_image.title);
					setShare(product_image.share);
					setPrevImg(product_image.image);
				}
			});
		}
	}, []);

	const titleController = (e) => {
		setTitle(e.target.value);
	};
	const shareController = (idx) => {
		setShare(idx);
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
			return props.modalController({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			if (share === '단일') {
				share = 0;
			} else if (share === '공유') {
				share = 1;
			}
			const formData = new FormData();
			formData.append('image', img);
			formData.append('title', title);
			formData.append('share', share);
			product_img.create(formData).then((res) => {
				if (res.data.success) {
					props.modalController({
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
			return props.modalController({
				type: 'confirm',
				text: '부족한 내용을 확인해주세요.',
			});
		} else {
			if (img) {
				const formData = new FormData();
				formData.append('image', img);
				formData.append('title', title);
				formData.append('share', share);
				product_img.edit(formData, product_image_id, true).then((res) => {
					console.log(res.data);
					if (res.data.success) {
					}
				});
			} else {
				// const data = {title, share};
			}
		}
	};

	useEffect(() => {
		if (editMode) {
			title ? setCheck(true) : setCheck(false);
		} else {
			title && img ? setCheck(true) : setCheck(false);
		}
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
						onChange={titleController}
					/>
				</Section>
				<Section>
					<Title>타입</Title>
					<Desc>
						단일 이미지는 하나의 상품에, 공유 이미지는 여러 상품에 등록할
						수 있습니다.
					</Desc>
					<ShareBox>
						{shareItems.map((el, idx) => (
							<ShareItem
								key={idx}
								selected={share === idx}
								onClick={() => {
									shareController(idx);
								}}>
								{el}
							</ShareItem>
						))}
					</ShareBox>
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
							src={`${IMG_ADDRESS}/${prevImg}`}
						/>
					)}
				</ImgWrap>
			</BottomWrap>
			<SaveButton active={check} onClick={onCreate}>
				저장하기
			</SaveButton>
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
	padding: 0 1rem;
`;

const ShareBox = styled.div`
	width: 40rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	border: 1px solid #a8b0c3;
`;
const ShareItem = styled.div`
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
	cursor: pointer;
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
`;
const ImgWrap = styled.div`
	margin-top: 2rem;
	width: 100%;
	height: 500rem;
	border: 1px solid #a8b0c3;
`;
const UploadImg = styled.img`
	width: 100%;
	height: 100%;
`;
