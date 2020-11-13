import React, { useState } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantiasDetalle from '../../../components/lista-garantias-detalle';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaDetalleReporte = ({ navigation }) => {
	const [list, setList] = useState([]);
	const route = useRoute();

	useFocusEffect(() => {
		const { params } = route;

		if (Array.isArray(params.detalle)) {
			setList(params.detalle);
		}
	});

	return (
		<Container>
			<ListaGarantiasDetalle navigation={navigation} etapa = {1} lista={list}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	)
}

export default Consumer(ListaDetalleReporte);