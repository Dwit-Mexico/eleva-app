import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';

// Styles
import Styles from '../../../styles/screens/GarantiasStyle';

const ListaGarantia = ({ navigation, context }) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes;

			if (Array.isArray(reportes)) {
				reportes = reportes.filter(r => r.IdEstado == 2 || r.IdEstado == 3 || r.IdEstado == 4 || r.IdEstado == 5);
				setLista(reportes);
			}

		},[context.reportes]);
	}

	return (
		<ImageBackground source={require('../../../../assets/background2.jpg')} style={{flex: 1}}>
			<View style={Styles.backGround}>
				<Container>
					<ListaGarantias navigation={navigation} lista = {lista} etapa = {2}/>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(ListaGarantia);
