import React from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaStyle';

function CardGarantia(props) {
	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate('DetalleGarantia', { garantiaEtapa: props.etapa }) : null}>
			<View style={CardStyles.card}>
				<Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Etapa {props.etapa}</Text>
				<View style={{flexDirection: 'row'}}>
					<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
						<FontAwesome5 name="exclamation-circle" size={30} color="black" />
					</View>
					<View style={{paddingLeft: 15}}>
						<Text>{props.proyecto}</Text>
						<Text>{props.name}</Text>
					</View>
				</View>
				<View style={{marginTop: 5}}>
					<Text>{props.area}</Text>
					<Text style={{textAlign: 'right', fontWeight: 'bold'}}>{props.fecha}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardGarantia;