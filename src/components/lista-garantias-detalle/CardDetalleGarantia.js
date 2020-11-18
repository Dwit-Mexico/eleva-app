import React, { useState, useEffect } from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaDetalleStyle';

function CardGarantia(props) {
	const [item, setItem] = useState({});
	const [titulo, setTitulo] = useState('');
	const [screen, setScreen] = useState('');
	const [estado, setEstado] = useState({ color: '#fff', text: ''});

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
	}, []);

	useEffect(() => {

		if (props.data.item) {
			setItem(props.data.item);
		}

	}, [props.data]);

	useEffect(() => {
		let color, text;

		switch(item.IdEstado) {
			case 1:
				text = 'Pendiente';
				color = '#000';
				break;
			case 2:
				text = 'Aplica Garantía';
				color = 'green';
				break;
			case 3:
				text = 'No Aplica Garantía';
				color = 'red';
				break;
			case 4:
				text = 'Por Agendar';
				color = '#000';
				break;
			case 5:
				text = 'Programada';
				color = 'green';
				break;
			case 6:
				text = 'Cancelada';
				color = '#000';
				break;
		}
		setEstado({color, text});
	}, [item]);



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
						<Text>&nbsp;</Text>
						<Text style={{textAlign: 'right', fontWeight: 'bold', marginBottom: 5, color: estado.color}}>{estado.text}</Text>
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
					<Text style={{textAlign: 'right', fontSize: 12, color: '#C1C1BF'}}>&nbsp;{item.IdEstado == 2 ? 'Agende la fecha de reparación' : null}</Text>
					<Text style={{textAlign: 'right', fontWeight: 'bold', marginBottom: 5, color: estado.color}}>{estado.text}</Text>
					<Text style={{textAlign: 'right', fontWeight: 'bold'}}>{props.fecha}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardGarantia;
