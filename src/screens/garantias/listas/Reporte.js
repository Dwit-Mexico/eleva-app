import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Consumer } from '../../../context';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment-timezone';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

// Styles
import Styles from '../../../styles/screens/GarantiasStyle';

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
		<ImageBackground source={require('../../../../assets/background2.jpg')} style={{flex: 1, height: '100%'}}>
			<View style={Styles.backGround}>
				<Container>
					<View style={{flex: 1}}>
						<ListaGarantias navigation={navigation} lista = {lista}/>
					</View>
					<View style={{flex: 0.1, flexDirection: 'row', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
							<View style={{maxWidth: 260}}>
								<Text style={{color: '#ffffff', fontSize: 18}}>Reporta aqui tu detalle</Text>
							</View>
							<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
						</View>
					</View>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(ListaReporte);