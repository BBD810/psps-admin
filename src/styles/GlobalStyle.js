import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;	
}
html {
	font-size: 62.5%;
	font-family:'kr-r';
}
body {
	margin: 0;
	background-color: #E5E6ED;
}
#root {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items:center;
}
#App {
	width:1920px;
	min-height:995px;
	display: flex;
	justify-content: center;
	position:relative;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
}
ul,
li {
	list-style: none;
	padding-left: 0;
	margin:0;
}
p {
	margin: 0;
	word-break: keep-all;
	white-space: pre-wrap;
}
textarea {
	resize: none;
}
input, 
textarea {
	padding:0 1rem;
	background: #f4f4f4 0% 0% no-repeat padding-box;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
}
textarea {
	padding: 0.5rem 1rem;
}
input:focus,
textarea:focus {
	outline: none;
	border: 2px solid var(--unnamed-color-111a31);
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #111a31;
}
input:focus::placeholder {
	color: #111a31;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance:none;
}
input[type='number']{
	-moz-appearance: textfield;
}
input::-webkit-file-upload-button { cursor:pointer }
button:hover {
	cursor: pointer;
}
input[type='date']::-webkit-clear-button, 
input[type='date']::-webkit-inner-spin-button { 
 display: none; 
} 
input[type='date']::-webkit-calendar-picker-indicator { 
	margin:0;
	margin-top:3px;
 	color: red;
} 
input[type='date'] { 
	height:3.1rem;
 	font-size:1.2rem;
 	font-family:'kr-r';
 	color:#7F8697;
	background-color:#F4F4F4;
}
::-webkit-scrollbar {
	width: 3px;
	height:3px;
}
::-webkit-scrollbar-thumb {
	background-color: #5e667b;
	border-radius: 10px;
}
::-webkit-scrollbar-track {
	background-color: #fff;
}
@media screen and (max-width:1300px) {
	html {
		font-size:41.66666%;
	}
	#App {
		width:1280px;
		min-height:720px;
	}
}
`;

export default GlobalStyle;
