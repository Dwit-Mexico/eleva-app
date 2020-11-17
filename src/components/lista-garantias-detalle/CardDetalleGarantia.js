import React, { useState, useEffect } from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaDetalleStyle';

function CardGarantia(props) {
	const [titulo, setTitulo] = useState('');
	const [screen, setScreen] = useState('');

	useEffect(() => {
		switch(props.etapa) {
			case 1:
				setTitulo('Reporte');
				setScreen('DetalleReporte');
				break;
			case 2:
				setTitulo('Garantía');
				setScreen('DetalleGarantia');
				break;
			case 3:
				setTitulo('Valoracion');
				setScreen('DetalleValoracion');
				break;
		}
	}, [])

	if (props.reporte) {
		return (
			<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate(screen, { data: props.data.item }) : null}>
				<View style={CardStyles.card}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
							<FontAwesome5 name="exclamation-circle" size={30} color="black" />
						</View>
						<View style={{paddingLeft: 15}}>
							<Text>Problema:</Text>
							<Text>{props.problema}</Text>
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

	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate(screen, { data: props.data.item }) : null}>
			<View style={CardStyles.card}>
				<View style={{flexDirection: 'row'}}>
					<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
						<FontAwesome5 name="exclamation-circle" size={30} color="black" />
					</View>
					<View style={{paddingLeft: 15}}>
						<Text>{props.proyecto}</Text>
						<Text>{props.unidad}</Text>
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
