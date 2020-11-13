import React, { useState } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantiasDetalle from '../../../components/lista-garantias-detalle';

const ListaDetalleGarantia = ({ navigation }) => {
	const [list, setList] = useState([]);
	const route = useRoute();

	useFocusEffect(() => {
		const { params } = route;
	});

	return (
		<Container>
			<ListaGarantiasDetalle navigation={navigation} etapa = {2}/>
		</Container>
	)
}

export default Consumer(ListaDetalleGarantia);