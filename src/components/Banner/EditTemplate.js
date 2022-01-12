import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as banner from '../../controller/banner';
import CreateTemplate from './CreateTemplate';

const EditTemplate = (props) => {
	const history = useHistory();
	const [input, setInput] = useState({});

	useEffect(() => {
		banner.get_detail(history.location.state).then((res) => {
			if (res.data.success) {
				setInput(res.data.banner);
			}
		});
	}, []);

	console.log(props.desc);

	return (
		<CreateTemplate
			changeMode={props.changeMode}
			mode={props.mode}
			input={input}
			desc={props.desc}
		/>
	);
};

export default withRouter(EditTemplate);
