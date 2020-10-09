import React from 'react';
import { View ,Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function CardVivienda(props) {
	return (
		<View style={{flex: 1, borderColor: '#12345', borderWidth: 1, flexDirection: 'row', marginTop: 2}}>
			<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
				<FontAwesome5 name="home" size={25}/>
			</View>
			<View>
				<Text>{props.name}</Text>
				<Text>{props.direccion}</Text>
				<Text>Validez Garantía: {props.fecha}</Text>
			</View>
		</View>
	);
}

export default CardVivienda;