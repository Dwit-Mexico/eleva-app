import React, { useState, useEffect } from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';

const ListaValoraciones = ({navigation, context}) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes
			reportes = reportes.filter(r => r.IdEstado == 5);

			if (Array.isArray(reportes)) {
				setLista(reportes);
			}

		},[context.reportes]);
	}

	return (
		<Container>
			<ListaGarantias navigation={navigation} lista = {lista} etapa = {3}/>
		</Container>
	)
}

export default Consumer(ListaValoraciones);