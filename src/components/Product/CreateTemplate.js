import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import StateInfo from './StateInfo';
import BasicInfo from './BasicInfo';

const CreateTemplate = (props) => {
	const history = useHistory();
	const [check, setCheck] = useState(false);

	return (
		<Container>
			<StateInfo />
			<BasicInfo />
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
