import React, { useState, useEffect } from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaDetalleStyle';

function CardGarantia(props) {
	const [titulo, setTitulo] = useState('');

	useEffect(() => {
		switch(props.etapa) {
			case 1:
				setTitulo('Reporte');
				break;
			case 2:
				setTitulo('Garantía');
				break;
			case 3:
				setTitulo('Valoracion');
				break;
		}
	}, [])

	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate('DetalleReporte', { garantiaEtapa: props.etapa, data: props.data }) : null}>
			<View style={CardStyles.card}>
				<Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>{titulo}</Text>
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
