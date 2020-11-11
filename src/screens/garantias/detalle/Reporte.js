import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';

const DetalleReporte = ({ navigation }) => {
	const [info, setInfo] = useState({});
	const route = useRoute();

	useFocusEffect(() => {
		const { params } = route;
		if (params.data) {
			setInfo(params.data.item);
		}
	});

	return (
		<Container>
			<Text>Detalle del reporte</Text>
			<View>
				<Text>{info.Numero}</Text>
			</View>
			<View>
				<Text>{info.NombreArea}</Text>
			</View>
			<Text>{info.NombreEquipo}</Text>
			<Text>{info.NombreProblema}</Text>
			<Text>{info.Comentarios}</Text>
		</Container>
	)
}

export default Consumer(DetalleReporte);
