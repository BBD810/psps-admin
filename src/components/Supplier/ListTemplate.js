import React, { useEffect, useRef, useState } from 'react';
import * as _supplier from '../../controller/supplier';
import styled from 'styled-components';
import PageSelector from '../PageSelector';

const ListTemplate = (props) => {
	const header = useRef();
	const body = useRef();
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [createMode, setCreateMode] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [input, setInput] = useState({});
	const [detail, setDetail] = useState({});
	const [list, setList] = useState([]);

	const onClickPage = (e) => {
		e !== page && setPage(e);
	};

	useEffect(() => {
		let isSubscribed = true;
		_supplier.get_list(page).then((res) => {
			if (isSubscribed && res.data.success) {
				setTotal(res.data.total);
				setList(res.data.supplier_list);
			}
		});
		return () => {
			isSubscribed = false;
		};
	}, [page]);

	const headerArr = [
		'상호명',
		'대표',
		'사업자 번호',
		'사업장 소재지',
		'연락처',
		'이메일',
		'담당자 연락처',
	];

	const createController = () => {
		typeof editMode !== 'number' && setCreateMode(!createMode);
	};
	const inputController = (e, idx) => {
		const value = e.target.value;
		if (idx === 0) {
			setInput({ ...input, name: value });
		} else if (idx === 1) {
			setInput({ ...input, owner: value });
		} else if (idx === 2) {
			setInput({ ...input, business_number: value });
		} else if (idx === 3) {
			setInput({ ...input, address: value });
		} else if (idx === 4) {
			setInput({ ...input, tel: value });
		} else if (idx === 5) {
			setInput({ ...input, email: value });
		} else if (idx === 6) {
			setInput({ ...input, manager_tel: value });
		}
	};
	const onCreate = () => {
		if (
			!input.name ||
			!input.owner ||
			!input.business_number ||
			!input.address ||
			!input.tel ||
			!input.email
		) {
			return props.setModal({
				type: 'confirm',
				text: '담당자 정보를 제외한\n모든 정보를 입력해주셔야 합니다.',
			});
		} else {
			_supplier.create(input, page).then((res) => {
				if (res.data.success) {
					props.setModal({
						type: 'confirm',
						text: '추가되었습니다.',
					});
					setCreateMode(false);
					setTotal(res.data.total);
					setList(res.data.supplier_list);
				}
			});
		}
	};

	const editController = (innerText, el, idx) => {
		if (createMode) {
			return;
		} else if (editMode !== false && detail.supplier_id !== el.supplier_id) {
			return;
		} else if (innerText === '수정') {
			setDetail(el);
			setEditMode(idx);
		} else if (innerText === '저장') {
			_supplier.edit(detail, detail.supplier_id, page).then((res) => {
				if (res.data.success) {
					setEditMode(false);
					setList(res.data.supplier_list);
				}
			});
		}
	};

	const deleteController = (innerText, el) => {
		if (createMode) {
			return;
		} else if (editMode !== false && detail.supplier_id !== el.supplier_id) {
			return;
		} else if (innerText === '취소') {
			setEditMode(false);
		} else if (innerText === '삭제') {
			setDetail(el);
			props.setModal({
				type: 'select',
				text: '삭제하시겠습니까?',
				act: 'delete',
			});
		}
	};

	useEffect(() => {
		let isSubscribed = true;
		let _modal = props.modal;
		if (_modal.act === 'delete' && _modal.return) {
			_supplier.remove(detail.supplier_id, page).then((res) => {
				if (isSubscribed && res.data.success) {
					props.setModal({ type: '' });
					setTotal(res.data.total);
					setList(res.data.supplier_list);
				}
			});
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line
	}, [props.modal.type]);

	return (
		<Container>
			<Wrap>
				<Header ref={header} blind={editMode !== false}>
					{headerArr.map((el, idx) => (
						<HeaderList key={idx}>
							{!createMode ? (
								<HeaderItem>{el}</HeaderItem>
							) : (
								<HeaderInput
									placeholder={el}
									onChange={(e) => {
										inputController(e, idx);
									}}
								/>
							)}
						</HeaderList>
					))}
					{!createMode ? (
						<HeaderButton onClick={createController}>
							추가하기
						</HeaderButton>
					) : (
						<Buttons>
							<Button filled onClick={onCreate}>
								저장
							</Button>
							<Button
								border
								onClick={() => {
									setCreateMode(false);
								}}>
								취소
							</Button>
						</Buttons>
					)}
				</Header>

				<Body ref={body}>
					{list.map((el, idx) => (
						<BodyList
							key={idx}
							blind={
								createMode || (editMode !== false && idx !== editMode)
							}>
							{idx !== editMode ? (
								<BodyItem>{el.name}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.name}
									onChange={(e) => {
										setDetail({ ...detail, name: e.target.value });
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.owner}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.owner}
									onChange={(e) => {
										setDetail({
											...detail,
											owner: e.target.value,
										});
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.business_number}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.business_number}
									onChange={(e) => {
										setDetail({
											...detail,
											business_number: e.target.value,
										});
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.address}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.address}
									onChange={(e) => {
										setDetail({
											...detail,
											address: e.target.value,
										});
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.tel}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.tel}
									onChange={(e) => {
										setDetail({ ...detail, tel: e.target.value });
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.email}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.email}
									onChange={(e) => {
										setDetail({
											...detail,
											email: e.target.value,
										});
									}}
								/>
							)}
							{idx !== editMode ? (
								<BodyItem>{el.manager_tel}</BodyItem>
							) : (
								<EditInput
									defaultValue={el.manager_tel}
									onChange={(e) => {
										setDetail({
											...detail,
											manager_tel: e.target.value,
										});
									}}
								/>
							)}

							<BodyItem>
								<Buttons>
									<Button
										filled
										onClick={(e) => {
											editController(e.target.innerText, el, idx);
										}}>
										{idx === editMode ? '저장' : '수정'}
									</Button>
									<Button
										border
										onClick={(e) => {
											deleteController(e.target.innerText, el);
										}}>
										{idx === editMode ? '취소' : '삭제'}
									</Button>
								</Buttons>
							</BodyItem>
						</BodyList>
					))}
				</Body>
			</Wrap>
			{list.length > 0 && (
				<PageSelector
					page={page}
					total={total}
					onePage={12}
					onClickPage={onClickPage}
				/>
			)}
		</Container>
	);
};

export default ListTemplate;

const Container = styled.div`
	width: 119rem;
`;
const Wrap = styled.div`
	margin-bottom: 4.7rem;
`;
const Header = styled.ul`
	width: 100%;
	height: 4.8rem;
	line-height: 4.8rem;
	padding: 0 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #e5e6ed;
	${(props) => props.blind && `opacity:0.3`}
`;
const HeaderList = styled.li`
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #a8b0c3;
	text-align: center;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;
const HeaderItem = styled.div``;
const HeaderInput = styled.input`
	width: 100%;
	font-size: 1.2rem;
	color: #7f8697;
	text-align: center;
`;
const Body = styled.div`
	width: 100%;
	height: 51.6rem;
	overflow-y: hidden;
`;
const BodyList = styled.ul`
	width: 100%;
	height: 4.3rem;
	padding: 0 2rem;
	font-size: 1.2rem;
	color: #2a3349;
	display: flex;
	align-items: center;
	${(props) => props.blind && `opacity:0.3`}
`;
const BodyItem = styled.li`
	height: 4.3rem;
	line-height: 4.3rem;
	text-align: center;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 1;
	-moz-line-clamp: 1;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;
const HeaderButton = styled.button`
	width: 14.8rem;
	height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	color: #2a3349;
	border: 2px solid #2a3349;
	border-radius: 4px;
	background-color: #fff;
	margin: 0 0.5rem;
`;
const EditInput = styled.input`
	width: 100%;
	height: 2.5rem;
	font-size: 1.2rem;
	/* line-height: 4.3rem; */
	text-align: center;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
	-ms-line-clamp: 1;
	-moz-line-clamp: 1;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin: 0 0.5%;
	:nth-child(1) {
		width: 10%;
	}
	:nth-child(2) {
		width: 5%;
	}
	:nth-child(3) {
		width: 11.5%;
	}
	:nth-child(4) {
		width: 22.5%;
	}
	:nth-child(5) {
		width: 10%;
	}
	:nth-child(6) {
		width: 10%;
	}
	:nth-child(7) {
		width: 10%;
	}
	:nth-child(8) {
		width: 13%;
	}
`;

const Buttons = styled.div`
	width: 14.8rem;
	margin: auto;
`;
const Button = styled.button`
	width: 7rem;
	height: 2.5rem;
	font-size: 1.2rem;
	font-family: 'kr-b';
	border: none;
	border-radius: 4px;
	:nth-child(1) {
		margin-right: 0.6rem;
	}
	${(props) =>
		props.filled
			? `background-color:#2A3349;color:#fff; `
			: `background-color:#fff;color:#2A3349;border:2px solid #2A3349; `}
`;
