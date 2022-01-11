import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';

const DetailTemplate = () => {
	const history = useHistory();
	const [detail, setDetail] = useState({});

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

	console.log(detail);

	return (
		<Container>
			<TopWrap>
				<Section>
					<Title>제목</Title>
					<Desc>{detail.title}</Desc>
				</Section>
				<Section>
					<Title>타입</Title>
					<Desc>{/* {`${detail.}`} */}</Desc>
					{/* <ShareBox>
						{shareItems.map((el, idx) => (
							<ShareItem
								key={idx}
								// selected={share === idx}
								// onClick={() => {
								// 	shareController(idx);
								// }}
							>
								{el}
							</ShareItem>
						))}
					</ShareBox> */}
				</Section>
			</TopWrap>
			<BottomWrap>
				<Title>이미지</Title>
				<Desc>
					사이즈 : 가로 1200px, 세로 5000px 권장 / 용량 : 10MB 이하 권장 /
					해상도 : 72dpi
				</Desc>

				<ImgWrap>
					{/* {prevImg && <UploadImg alt='product detail img' src={prevImg} />} */}
				</ImgWrap>
			</BottomWrap>
			<SaveButton
			// active={check} onClick={onCreate}
			>
				저장하기
			</SaveButton>
		</Container>
	);
};

export default DetailTemplate;

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
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
	font-size: 1.2rem;
	color: #2a3349;
	margin-bottom: 1.2rem;
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
	height: 38rem;
	position: relative;
	overflow-y: scroll;
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
