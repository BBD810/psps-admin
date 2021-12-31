import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const DetailTemplate = (props) => {
	const history = useHistory();
	console.log(props.title);
	console.log(props.desc);
	// console.log(history.location.state);
	return <Container></Container>;
};

export default withRouter(DetailTemplate);

const Container = styled.div`
	width: 119rem;
	height: 71.15rem;
	padding: 3.05rem 0 0 0;
	overflow-y: scroll;
`;
