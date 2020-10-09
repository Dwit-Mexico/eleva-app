import React from 'react';
import { View ,Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function CardGarantia(props) {
	return (
		<View style={{flex: 1, borderColor: '#12345', borderWidth: 1, marginTop: 2}}>
			<View style={{flexDirection: 'row'}}>
				<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
					<FontAwesome5 name="exclamation-circle" size={24} color="black" />
				</View>
				<View>
					<Text>{props.proyecto}</Text>
					<Text>{props.name}</Text>
					<Text>{props.direccion}</Text>
				</View>
			</View>
			<View>
				<Text>{props.area}</Text>
				<Text>{props.fecha}</Text>
			</View>
		</View>
	);
}

export default CardGarantia;