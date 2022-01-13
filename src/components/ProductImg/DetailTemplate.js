import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS, CLIENT_ADDRESS } from '../../config';
import * as product_img from '../../controller/product_img';
import styled from 'styled-components';

const DetailTemplate = (props) => {
	const history = useHistory();
	const typeItems = ['단일', '공유'];
	const [detail, setDetail] = useState({});
	const [shareList, setShareList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		product_img.get_detail(history.location.state).then((res) => {
			if (isSubscribed && res.data.success) {
				setDetail(res.data.product_image);
				setShareList(res.data.product_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	const selectList = () => {
		props.changeMode('list');
	};
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
	const selectShare = () => {
		if (detail.share === 1 && detail.used > 1) {
			props.modalController({
				type: 'confirm',
				text: '공유여부 변경하기',
				//  선택하기로 수정해야함
			});
		} else {
			goShare();
		}
	};
	const goShare = () => {
		props.modalController({
			type: 'select',
			text: '타입(공유여부)을 변경하시겠습니까?',
			act: 'share',
		});
	};
	const selectReplace = () => {};
	const selectEdit = () => {
		history.push({ state: detail.product_image_id });
		props.changeMode('edit');
	};
	const checkLink = (product_id) => {
		history.push({ pathname: '/product', state: product_id });
	};

	useEffect(() => {
		let isSubscribed = true;
		if (props.modal.act === 'delete' && props.modal.return) {
			product_img.remove(detail.product_image_id).then((res) => {
				if (isSubscribed && res.data.success) {
					success();
				}
			});
		} else if (props.modal.act === 'share' && props.modal.return) {
			product_img.change_share(detail.product_image_id).then((res) => {
				if (res.data.success) {
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
					<Desc>
						단일 이미지는 하나의 상품에, 공유 이미지는 여러 상품에 등록할
						수 있습니다.
					</Desc>
					<TypeBox>
						{typeItems.map((el, idx) => (
							<TypeItem key={idx} selected={detail.share === idx}>
								{el}
							</TypeItem>
						))}
					</TypeBox>
				</Section>
				<Section>
					<Title>상품 목록</Title>
					<Subtitle>
						{`해당 이미지를 사용중인 상품의 목록입니다.\n공유중인 상품이 있을 경우 타입변경이 불가능합니다.`}
					</Subtitle>
					<ShareList>
						{shareList &&
							shareList
								.map((el, idx) => (
									<ShareItem
										key={idx}
										onClick={() => {
											checkLink(el.product_id);
										}}>
										{`${idx + 1} - ${el.title}`}
									</ShareItem>
								))
								.reverse()}
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
				<Button border onClick={selectList}>
					목록으로
				</Button>
				<Button border onClick={selectDelete}>
					삭제하기
				</Button>
				<Button onClick={selectShare}>타입변경</Button>
				<Button onClick={selectReplace}>상품이전</Button>
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
	justify-content: space-between;
	align-items: center;
	margin-bottom: 7.4rem;
`;
const Section = styled.div`
	height: 26.1rem;
	:nth-child(1) {
		width: 20rem;
		margin-right: 11.1rem;
	}
	:nth-child(2) {
		width: 40rem;
		margin-right: 11.1rem;
	}
	:nth-last-child(1) {
		width: 36.7rem;
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
				border:2px solid #848CA2;`
			: `color: #5E667B;  `}
`;
const ShareList = styled.ul`
	width: 100%;
	height: 20rem;
	padding: 0.7rem 0;
	border-top: 2px solid #e5e6ed;
	border-bottom: 2px solid #e5e6ed;
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
const ShareItem = styled.li`
	margin-bottom: 0.8rem;
	cursor: pointer;
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
	margin-left: 0.8rem;
	:nth-child(1) {
		margin: 0;
	}
	${(props) =>
		props.border &&
		`	color: #2a3349;
		background-color: unset;
		border: 2px solid #2a3349;`}
`;