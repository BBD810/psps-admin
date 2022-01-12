import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<FooterWrap>
			<FooterText>
				© 2021 Copyright CetusStudio. All Rights Reserved
			</FooterText>
		</FooterWrap>
	);
};

export default Footer;

const FooterWrap = styled.div`
	margin-top: 3rem;
	width: 120rem;
	height: 7.8rem;
	border-top: 2px solid #e5e6ed;
`;
const FooterText = styled.p`
	margin-top: 2rem;
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: 1.2rem;
	color: #a8b0c3;
	letter-spacing: -0.24px;
	text-align: center;
`;
