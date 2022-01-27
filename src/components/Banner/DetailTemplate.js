import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import { numberToString } from '../../functions/NumberToString';
import { getLinkKr } from '../../functions/GetLink';
import * as banner from '../../controller/banner';
import styled from 'styled-components';

const DetailTemplate = (props) => {
	const history = useHistory();
	const [banner_id, setBanner_id] = useState('');
	const [imgHeight, setImgHeight] = useState({});
	const [displayList, setDisplayList] = useState(false);
	const [detail, setDetail] = useState({});
	const [displayState, setDisplayState] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		let type = props.category.substr(0, 2);
		if (props.category === '메인 배너') {
			setImgHeight({ height: '52.3rem' });
		} else if (props.category === '광고 배너') {
			setImgHeight({ height: '34.9rem' });
		}
		banner.get_detail(history.location.state).then((res) => {
			if (isSubscribed && res.data.success) {
				setDetail(res.data.banner);
				setBanner_id(history.location.state);
			}
		});
		banner.get_display_list(type, true).then((res) => {
			if (isSubscribed && res.data.success) {
				setDisplayList(res.data.banner_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	const selectEdit = () => {
		history.push({ state: banner_id });
		props.changeMode('edit');
	};
	const selectDisplay = () => {
		if (detail.display === 1 && displayList.length === 1) {
			return props.modalController({
				type: 'confirm',
				text: '최소 한 개의 배너는\n노출중이어야 합니다.',
			});
		} else if (detail.display === 0 && displayList.length === 3) {
			return props.modalController({
				type: 'list',
				text: '배너는 최대 세 개만 노출이 가능합니다.\n교환할 배너를 선택해주세요.',
				list: displayList,
			});
		} else {
			goDisplay();
		}
	};
	const goDisplay = () => {
		props.modalController({
			type: 'select',
			text: '해당 배너의\n노출상태를 변경하시겠습니까?',
			act: 'display',
		});
	};

	const selectDelete = () => {
		if (detail.display === 1) {
			props.modalController({
				type: 'confirm',
				text: '노출중인 배너는\n삭제할 수 없습니다.',
			});
		} else if (detail.display === 1 && displayList.length < 2) {
			props.modalController({
				...props.modal,
				type: 'confirm',
				text: '최소 한 개의 배너는\n노출중이어야 합니다.',
			});
		} else {
			goDelete();
		}
	};
	const goDelete = () => {
		props.modalController({
			type: 'select',
			text: '해당 배너를\n삭제하시겠습니까?',
			act: 'delete',
		});
	};
	const selectList = () => {
		props.changeMode('list');
	};

	useEffect(() => {
		if (displayList) {
			for (let i = 0; i < displayList.length; i++) {
				if (displayList[i].banner_id === detail.banner_id) {
					return setDisplayState(numberToString(i + 1) + '번째로 노출 중');
				} else {
					setDisplayState('노출되지 않음');
				}
			}
		}
	}, [displayList]);

	useEffect(() => {
		let isSubscribed = true;
		let _modal = props.modal;
		if (_modal.act === 'display' && _modal.return) {
			banner.change_display(banner_id).then((res) => {
				isSubscribed && res.data.success && success();
			});
		} else if (_modal.act === 'delete' && _modal.return) {
			banner.remove(banner_id).then((res) => {
				isSubscribed && res.data.success && success();
			});
		} else if (_modal.act === 'replace' && _modal.return) {
			const arr = [detail, displayList[props.modal.return]];
			banner.replace_display(arr).then((res) => {
				isSubscribed && res.data.success && success();
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
			<DetailImgBox style={imgHeight}>
				<DetailImg
					alt='banner img'
					src={detail.image && `${IMG_ADDRESS}/${detail.temp_image}`}
				/>
			</DetailImgBox>
			<DetailContentsBox>
				<DetailContents>
					<DetailTitle>제목</DetailTitle>
					<DetailDesc>{detail.title}</DetailDesc>
				</DetailContents>
				<DetailContents>
					<DetailTitle>링크</DetailTitle>
					<DetailDesc>
						{getLinkKr(
							detail.page,
							detail.part,
							detail.subPart,
							detail.product_id
						)}
					</DetailDesc>
				</DetailContents>
				<DetailContents>
					<DetailTitle>노출상태</DetailTitle>
					<DetailDesc>{displayState && displayState}</DetailDesc>
				</DetailContents>
			</DetailContentsBox>
			<Buttons>
				<Button border onClick={selectList}>
					목록으로
				</Button>
				<Button border onClick={selectDelete}>
					삭제하기
				</Button>
				<Button onClick={selectDisplay}>노출변경</Button>
				<Button onClick={selectEdit}>수정하기</Button>
			</Buttons>
		</Container>
	);
};

export default withRouter(DetailTemplate);

const Container = styled.div`
	width: 119rem;
	padding: 3.05rem 0 0 0;
	position: relative;
`;
const DetailImgBox = styled.div`
	width: 119rem;
	border: 1px solid #a8b0c3;
`;
const DetailImg = styled.img`
	width: 100%;
	height: 100%;
`;
const DetailContentsBox = styled.ul`
	margin-top: 1.2rem;
	width: 119rem;
	height: 4.3rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const DetailContents = styled.li`
	width: 33.3333333%;
	height: 100%;
	padding-left: 0.4rem;
`;
const DetailTitle = styled.p`
	height: 1.9rem;
	line-height: 1.9rem;
	font-size: 1.3rem;
	color: #5e667b;
`;
const DetailDesc = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #2a3349;
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
