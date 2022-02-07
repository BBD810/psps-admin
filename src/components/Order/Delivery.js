import React from 'react';
import styled from 'styled-components';
import DeliveryFilter from './DeliveryFilter';
import DeliveryList from './DeliveryList';

const Delivery = () => {
	return (
		<Container>
			<DeliveryFilter />
			<DeliveryList />
		</Container>
	);
};

export default Delivery;

const Container = styled.div``;
