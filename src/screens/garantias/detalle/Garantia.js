import React from 'react';
import { View, Text } from 'react-native';
import { Consumer } from '../../../context';

// Componentes

const DetalleGarantia = ({ navigation }) => {
	return (
		<View>
			<Text>Detalle garantía</Text>
		</View>
	)
}

export default Consumer(DetalleGarantia);
