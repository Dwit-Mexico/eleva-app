import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Consumer } from '../../../context';
import moment from 'moment-timezone';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaReporte = ({ navigation, context }) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = [];
			if (Array.isArray(context.reportes)) {
				let rptTemp = context.reportes.sort((a, b) => {
					if (a.Fecha > b.Fecha)
						return -1;
					if (a.Fecha < b.Fecha)
						return 1;
					return 0;
				});

				rptTemp.filter(r => r.IdEstado != 6 ).forEach(rep => {
					const exist = reportes.find(e => e.IdUnidad == rep.IdUnidad && e.IdArea == rep.IdArea);
					if(!exist) {
						reportes.push({
							id: reportes.length,
							IdUnidad: rep.IdUnidad,
							IdArea: rep.IdArea,
							NombreArea: rep.NombreArea,
							NombreProyecto: rep.NombreProyecto,
							Numero: rep.Numero,
							Fecha: moment(rep.Fecha).format(),
							NoSolicitud: rep.NoSolicitud
						});
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
			}

		}, [context.reportes])
	}

	return (
		<Container>
			<View style={{flex: 1}}>
				<ListaGarantias navigation={navigation} lista = {lista}/>
			</View>
			<View style={{flex: 0.1, flexDirection: 'row', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
				<View style={{maxWidth: 260}}>
					<Text>Reporta aqui tu detalle</Text>
				</View>
				<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
			</View>
		</Container>
	)
}

export default Consumer(ListaReporte);