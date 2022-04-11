import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../modules/admin';
import * as authController from '../../controller/auth';
import styled from 'styled-components';
import logo from '../../images/logo_cetus.svg';
import ConfirmModal from '../../view/components/Modal/Confirm';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const showButton = useRef();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false);
	const [modal, setModal] = useState({ type: '' });

	const onChangeUsername = (e) => {
		return setUsername(e.target.value);
	};
	const onChangePassword = (e) => {
		return setPassword(e.target.value);
	};
	const showController = () => {
		return setShow(!show);
	};
	const onShow = () => {
		if (showButton.current) {
			showButton.current.style.color = '#5887ff';
		}
	};
	const onNotShow = () => {
		if (showButton.current) {
			showButton.current.style.color = '#e5e6ed';
		}
	};
	const onSubmit = () => {
		if (username.length === 0) {
			setModal({ type: 'confirm', text: '아이디를 확인해주세요.' });
		} else if (password.length === 0) {
			setModal({ type: 'confirm', text: '비밀번호를 확인해주세요.' });
		} else {
			const data = { username, password };
			authController.login(data).then((res) => {
				if (res.data.success) {
					dispatch(adminLogin());
					navigate('/');
				} else {
					setModal({
						type: 'confirm',
						text: '아이디 또는 비밀번호를 확인해주세요.',
					});
				}
			});
		}
	};
	const onEnter = (e) => {
		e.key === 'Enter' && onSubmit();
	};

	return (
		<Login>
			<LogoImg alt='logo img' src={logo} />
			<Input
				type='text'
				value={username ? username : ''}
				placeholder='ID'
				onFocus={onNotShow}
				onChange={onChangeUsername}
				onKeyDown={onEnter}
			/>
			<Input
				type={show ? 'text' : 'password'}
				value={password ? password : ''}
				placeholder='Password'
				onFocus={onShow}
				onChange={onChangePassword}
				onKeyDown={onEnter}
			/>
			<Button onClick={onSubmit}>Log in</Button>
			<Text ref={showButton} onClick={showController}>
				Show
			</Text>
			{modal.type === 'confirm' && (
				<ConfirmModal modal={modal} setModal={setModal} />
			)}
		</Login>
	);
};

export default LoginPage;

const Login = styled.div`
	width: 83.9rem;
	height: 52.2rem;
	margin-top: 22rem;
	background: #fcfcfc 0% 0% no-repeat padding-box;
	box-shadow: 2px 6px 30px #00000033;
	border-radius: 4px;
	opacity: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;
const LogoImg = styled.img`
	width: 38.3rem;
	height: 9.6rem;
	margin-bottom: 4.9rem;
`;
const Input = styled.input`
	width: 46rem;
	height: 5.6rem;
	font-size: 2rem;
	margin-bottom: 1.6rem;
	padding: 0 1.5rem;
	${(props) => props.active && `margin-bottom:4.6rem`}
`;
const Button = styled.button`
	width: 46rem;
	height: 5.6rem;
	font-size: 2.5rem;
	color: #fff;
	background: var(--unnamed-color-111a31) 0% 0% no-repeat padding-box;
	background: #111a31 0% 0% no-repeat padding-box;
	border-radius: 4px;
	border: none;
	opacity: 1;
`;
const Text = styled.p`
	font-size: 2rem;
	color: #e5e6ed;
	position: absolute;
	top: 32rem;
	left: 58.3rem;
	&:hover {
		cursor: pointer;
	}
`;
