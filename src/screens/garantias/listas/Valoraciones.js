import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';

const ListaValoraciones = ({navigation, context}) => {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes
			reportes = reportes.filter(r => r.IdEstado == 7);

			if (Array.isArray(reportes)) {
				setLista(reportes);
			}

		},[context.reportes]);
	}

	return (
		<Container>
			<View style={{width: '100%'}}>
				<View style={{height: 8}}/>
				<Text style={{fontSize: 18}}>Su opinion nos interesa. Ayúdenos a valorar nuestro servicio.</Text>
				<Text style={{fontSize: 18}}>Muchas Gracias</Text>
			</View>
			<ListaGarantias navigation={navigation} lista = {lista} etapa = {3}/>
		</Container>
	)
}

export default Consumer(ListaValoraciones);