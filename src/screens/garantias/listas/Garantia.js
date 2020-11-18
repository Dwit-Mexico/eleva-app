import React, { useState, useEffect } from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';

const ListaGarantia = ({ navigation, context }) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes
			reportes = reportes.filter(r => r.IdEstado == 2 || r.IdEstado == 3 || r.IdEstado == 4 || r.IdEstado == 5);

			if (Array.isArray(reportes)) {
				setLista(reportes);
			}

		},[context.reportes]);
	}

	return (
		<Container>
			<ListaGarantias navigation={navigation} lista = {lista} etapa = {2}/>
		</Container>
	)
}

export default Consumer(ListaGarantia);
