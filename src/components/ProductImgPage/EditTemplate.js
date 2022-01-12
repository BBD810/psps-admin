import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as product_img from '../../controller/product_img';
import CreateTemplate from './CreateTemplate';

const EditTemplate = (props) => {
	const history = useHistory();
	const [input, setInput] = useState({});

	useEffect(() => {
		product_img.get_detail(history.location.state).then((res) => {
			if (res.data.success) {
				console.log(res.data);
				setInput(res.data.product_image);
			}
		});
	}, []);

	return (
		<CreateTemplate
			changeMode={props.changeMode}
			mode={props.mode}
			input={input}
			title={props.title}
			desc={props.desc}
		/>
	);
};

export default withRouter(EditTemplate);
