import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as _product_img from '../../controller/product_img';
import styled from 'styled-components';

const DetailImgCreate = (props) => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [type, setType] = useState('단일');
	const [img, setImg] = useState(false);
	const [check, setCheck] = useState(false);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangeType = (e) => {
		setType(e.target.innerText);
	};
	const fileUpload = (e) => {
		const file = e.target.files;
		if (file[0]) {
			setImg(file[0]);
		}
	};

	const selectYes = () => {
		let share;
		type === '단일' ? (share = 0) : (share = 1);
		const formData = new FormData();
		formData.append('image', img);
		formData.append('title', title);
		formData.append('share', share);
		_product_img.create(formData).then((res) => {
			if (res.data.success) {
				history.push({ state: res.data.product_image_id });
				props.setModal({
					type: 'confirm',
					text: '이미지가 생성되었습니다.',
				});
			}
		});
	};
	const selectNo = () => {
		props.setModal({ ...props.modal, type: 'img_list' });
	};

	useEffect(() => {
		title && img ? setCheck(true) : setCheck(false);
	}, [title, img]);

	return (
		<Container>
			<Wrap>
				<Text>상품 상세 이미지 추가하기</Text>
				<Items>
					<Item>
						<Title>제목</Title>
						<Desc>명확한 제목으로 등록 바랍니다.</Desc>
						<Input
							placeholder='제목을 입력해주세요. (최대 45자)'
							onChange={onChangeTitle}
						/>
					</Item>
					<Item>
						<Title>타입</Title>
						<Desc>
							단일 이미지는 하나의 상품에, 공유 이미지는 여러 상품에
							등록할 수 있습니다.
						</Desc>
						<TypeBox>
							{['단일', '공유'].map((el, idx) => (
								<TypeItem
									key={idx}
									active={el === type}
									onClick={onChangeType}>
									{el}
								</TypeItem>
							))}
						</TypeBox>
					</Item>
					<Item>
						<Title>이미지</Title>
						<Desc>
							사이즈 : 가로 1200px, 세로 5000px 권장 / 용량 : 10MB 이하
							권장 / 해상도 : 72dpi
						</Desc>
						<Upload>
							<UploadButton>업로드</UploadButton>
							<UploadInput type='file' onChange={fileUpload} />
							<UploadName>
								{img ? img.name : '업로드 되지 않음'}
							</UploadName>
						</Upload>
					</Item>
				</Items>
				<Buttons>
					<Button border onClick={selectNo}>
						취소
					</Button>
					<Button filled active={check} onClick={selectYes}>
						확인
					</Button>
				</Buttons>
			</Wrap>
		</Container>
	);
};

export default DetailImgCreate;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 30;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Wrap = styled.div`
	width: 65.7rem;
	height: 55rem;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 20;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 4px 30px #0000004d;
`;
const Text = styled.p`
	margin-bottom: 3.9rem;
	height: 2.9rem;
	line-height: 2.9rem;
	font-size: 2rem;
	font-family: 'kr-b';
	color: #2a3349;
`;
const Items = styled.div`
	width: 40.3rem;
	height: 31.1rem;
`;
const Item = styled.div`
	margin-bottom: 4rem;
	:nth-last-child(1) {
		margin: 0;
	}
`;
const Title = styled.p`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
	letter-spacing: 0.13px;
`;
const Desc = styled.p`
	margin-bottom: 1.2rem;
	font-size: 1rem;
	color: #848ca2;
	letter-spacing: -0.2px;
`;
const Input = styled.input`
	width: 20rem;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.2rem;
	color: #7f8697;
	letter-spacing: -0.24px;
`;
const TypeBox = styled.ul`
	width: 40rem;
	height: 3.1rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	border: 1px solid #a8b0c3;
`;
const TypeItem = styled.li`
	width: 50%;
	height: 3.1rem;
	line-height: 3.1rem;
	font-size: 1.4rem;
	color: #5e667b;
	border-radius: 4px;
	text-align: center;
	${({ active }) => {
		return (
			active && `font-family:'kr-b'; color:#2A3349; border:2px solid #5887FF`
		);
	}}
`;
const Upload = styled.div`
	display: flex;
	align-items: flex-end;
	position: relative;
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
const UploadInput = styled.input`
	width: 10.6rem;
	height: 3.1rem;
	border-radius: 4px;
	position: absolute;
	left: 0;
	opacity: 0;
`;
const UploadName = styled(Desc)`
	margin-left: 1rem;
	margin-bottom: 0;
`;
const Buttons = styled.div`
	margin-top: 6rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Button = styled(UploadButton)`
	${(props) => props.filled && !props.active && `opacity:0.4`}
	${({ border }) => {
		return (
			border &&
			`color:#2A3349; border:2px solid #2A3349;background-color:unset; margin-right:1rem;`
		);
	}}
`;
