import React from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaStyle';

function CardGarantia(props) {
	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate('DetalleGarantia') : null}>
			<View style={CardStyles.card}>
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
		</TouchableOpacity>
	);
}

export default CardGarantia;