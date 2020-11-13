import React, { useState, useEffect } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantiasDetalle from '../../../components/lista-garantias-detalle';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaDetalleReporte = ({ navigation, context }) => {
	const [list, setList] = useState([]);
	const route = useRoute();

	useFocusEffect(() => {
		const { params } = route;

		if (Array.isArray(params.detalle)) {
			setList(context.reportes);
		}
	});

	if (context) {
		useEffect(() => {
			const { params } = route;
			console.log('PARAMS', params);
			let reportes = context.reportes
			reportes = reportes.filter(r => r.IdArea == params.IdArea && r.IdUnidad == params.IdUnidad);

			if (Array.isArray(reportes)) {
				setList(reportes);
			}

		},[context.reportes]);
	}

	return (
		<Container>
			<ListaGarantiasDetalle navigation={navigation} etapa = {1} lista={list}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	)
}

export default Consumer(ListaDetalleReporte);