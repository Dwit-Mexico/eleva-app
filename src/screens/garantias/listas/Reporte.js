import React, { useState, useEffect } from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaReporte = ({ navigation, context }) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = [];

			context.reportes.filter(r => r.IdEstado == 1 || r.IdEstado == 6 ).forEach(rep => {
				const exist = reportes.find(e => e.IdUnidad == rep.IdUnidad && e.IdArea == rep.IdArea);
				if(!exist) {
					reportes.push({
						id: reportes.length,
						IdUnidad: rep.IdUnidad,
						IdArea: rep.IdArea,
						NombreArea: rep.NombreArea,
						NombreProyecto: rep.NombreProyecto,
						Numero: rep.Numero
					})
				}
			});

			reportes = reportes.sort((a, b) => {
				if (a.IdUnidad > b.IdUnidad)
					return 1;
				if (a.IdUnidad < b.IdUnidad)
					return -1;
				return 0;
			});

			setLista(reportes);

		}, [context.reportes])
	}

	return (
		<Container>
			<ListaGarantias navigation={navigation} lista = {lista}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	)
}

export default Consumer(ListaReporte);