import React from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaStyle';

function CardGarantia(props) {
	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate('GarantiasDetalle', { garantiaEtapa: props.etapa, detalle: true }) : null}>
			<View style={CardStyles.card}>
				<View style={{flexDirection: 'row'}}>
					<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
						<FontAwesome5 name="house-damage" size={24} color="black" />
					</View>
					<View style={{paddingLeft: 15}}>
						<Text style={{padding: 5}}>{props.proyecto}</Text>
						<Text style={{padding: 5}}>{props.name}</Text>
						<Text style={{padding: 5, fontWeight: 'bold'}}>{props.fecha}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardGarantia;