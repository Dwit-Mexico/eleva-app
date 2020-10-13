import React from 'react';
import { View ,Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardViviendaStyle';

function CardVivienda(props) {
	return (
		<View style={CardStyles.card}>
			<View style={{flexDirection:'column', justifyContent:'center', padding: 5, marginRight: 15}}>
				<FontAwesome5 name="home" size={25}/>
			</View>
			<View>
				<Text style={{padding: 5}}>{props.name}</Text>
				<Text style={{padding: 5}}>{props.direccion}</Text>
				<Text style={{padding: 5}}>Validez Garantía: {props.fecha}</Text>
			</View>
		</View>
	);
}

export default CardVivienda;