import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as category from '../../data/link';
import styled from 'styled-components';
import StateInfo from './StateInfo';
import BasicInfo from './BasicInfo';

const CreateTemplate = (props) => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [part, setPart] = useState('농산');
	const [subPart, setSubPart] = useState('과일/수입청과');
	const [origin, setOrigin] = useState('');
	const [storage, setStorage] = useState('');

	const [check, setCheck] = useState(false);

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const onChangePart = (e) => {
		if (part !== e.target.innerText) {
			setPart(e.target.innerText);
		}
	};
	const onChangeSubPart = (e) => {
		if (subPart !== e.target.innerText) {
			setSubPart(e.target.innerText);
		}
	};

	return (
		<Container>
			<StateInfo />
			<BasicInfo
				title={title}
				part={part}
				subPart={subPart}
				// thumbnailImg={thumbnailImg}
				// detailImg={detailImg}
				// supplierList={supplierList}
				onChangeTitle={onChangeTitle}
				onChangePart={onChangePart}
				onChangeSubPart={onChangeSubPart}
				// thumbnailUpload={thumbnailUpload}
				// detailUpload={detailUpload}
				mode={props.mode}
				changeMode={props.changeMode}
				modal={props.modal}
				modalController={props.modalController}
			/>
			<SaveButton
				active={check}
				// onClick={onCreate}
			>
				저장하기
			</SaveButton>
		</Container>
	);
};

export default withRouter(CreateTemplate);

const Container = styled.div`
	width: 119rem;
	padding-top: 3.05rem;
	position: relative;
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
