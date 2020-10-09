import React from 'react';
import { View ,Text } from 'react-native';
import {} from '@expo/vector-icons';

function ListaViviendas(props) {
	return (
		<View style={{flex: 1, borderColor: "#12345", borderWidth: 1, flexDirection: "row"}}>
			<View>

			</View>
			<View>
				<Text>{props.name}</Text>
				<Text>{props.direccion}</Text>
				<Text>Validez Garantía: {props.fecha_garantia}</Text>
			</View>
		</View>
	);
}

export default ListaViviendas;