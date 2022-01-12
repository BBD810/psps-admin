import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';

const DetailTemplate = (props) => {
	const history = useHistory();
	const [detail, setDetail] = useState({});
	const [title, setTitle] = useState(false);
	const [share, setShare] = useState(false);
	const [img, setImg] = useState(false);
	const [prevImg, setPrevImg] = useState(false);
	const [shareList, setShareList] = useState([
		'풀 이파리 더블팩',
		'파릇파릇 횡성 양상추',
		'베타카로딘이 풍부한 녹색 채소 신품급',
		'베타카로틴이 풍부한 녹색 채소 민트급',
	]);

	const selectEdit = () => {
		history.push({ state: detail.product_image_id });
		props.changeMode('edit');
	};
	const selectDisplay = () => {};
	const goDisplay = () => {};

	const selectDelete = () => {
		if (detail.share === 1) {
			return props.modalController({
				type: 'confirm',
				text: '공유되어있는 이미지는\n삭제할 수 없습니다.',
			});
		} else {
			goDelete();
		}
	};
	const goDelete = () => {
		props.modalController({
			type: 'select',
			text: '해당 이미지를\n삭제하시겠습니까?',
			act: 'delete',
		});
	};

	useEffect(() => {
		let isSubscribed = true;
		product_img.get_detail(history.location.state).then((res) => {
			if (isSubscribed && res.data.success) {
				setDetail(res.data.product_image);
			}
		});

		return () => {
			isSubscribed = false;
		};
	}, []);

	useEffect(() => {
		let isSubscribed = true;
		if (props.modal.act === 'delete' && props.modal.return) {
			product_img.remove(detail.product_image_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success();
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
	}, [props.modal.type]);

	const success = () => {
		props.modalController({ type: '' });
		props.changeMode('list');
	};

	return (
		<Container>
			<TopWrap>
				<Section>
					<Title>제목</Title>
					<Desc>{detail.title}</Desc>
				</Section>
				<Section>
					<Title>타입</Title>
					<Desc>{detail.share === 1 ? '공유 이미지' : '단독 이미지'}</Desc>
				</Section>
				<Section>
					<Title>상품 목록</Title>
					<Subtitle>해당 이미지를 사용중인 상품의 목록입니다.</Subtitle>
					<ShareList>
						{shareList.map((el, idx) => (
							<ShareItem key={idx}>{`${idx + 1} - ${el}`}</ShareItem>
						))}
					</ShareList>
				</Section>
			</TopWrap>
			<BottomWrap>
				<Title>이미지</Title>
				<Desc>
					사이즈 : 가로 1200px, 세로 5000px 권장 / 용량 : 10MB 이하 권장 /
					해상도 : 72dpi
				</Desc>

				<ImgWrap>
					{detail.image && (
						<UploadImg
							alt='product detail img'
							src={`${IMG_ADDRESS}/${detail.image}`}
						/>
					)}
				</ImgWrap>
			</BottomWrap>
			<Buttons>
				<Button onClick={selectDelete}>삭제하기</Button>
				<Button onClick={selectDisplay}>목록이전</Button>
				<Button onClick={selectEdit}>수정하기</Button>
			</Buttons>
		</Container>
	);
};

export default withRouter(DetailTemplate);

const Container = styled.div`
	width: 119rem;
	padding-top: 3.05rem;
	position: relative;
`;
const TopWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 7.4rem;
`;
const Section = styled.div`
	width: 30%;
	height: 24.6rem;
	:nth-last-child(1) {
		margin-left: 10rem;
	}
`;
const Title = styled.h4`
	font-size: 1.3rem;
	font-family: 'kr-b';
	color: #5e667b;
`;
const Subtitle = styled.p`
	font-size: 1rem;
	color: #848ca2;
	margin-bottom: 1.2rem;
`;
const Desc = styled.p`
	font-size: 1.2rem;
	color: #2a3349;
	margin-bottom: 1.2rem;
`;
const ShareList = styled.ul`
	width: 100%;
	height: 20rem;
	padding: 0.7rem 0;
	border-top: 2px solid #e5e6ed;
	border-bottom: 2px solid #e5e6ed;
`;
const ShareItem = styled.li`
	margin-bottom: 0.8rem;
	:nth-last-child(1) {
		margin: 0;
	}
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
	border: 1px solid #a8b0c3;
`;
const UploadImg = styled.img`
	width: 100%;
	height: 100%;
`;
const Buttons = styled.div`
	width: 33.4rem;
	height: 3.1rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	top: -5.75rem;
	right: 0;
`;
const Button = styled.button`
	width: 10.6rem;
	height: 100%;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	background-color: #2a3349;
	color: #fff;
	margin-left: 8px;
	&:nth-child(1) {
		color: #2a3349;
		background-color: unset;
		border: 2px solid #2a3349;
	}
`;
