import React, { useState, useEffect } from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import CardStyles from '../../styles/components/CardGarantiaStyle';

function CardGarantia(props) {
	const [info, setInfo] = useState({});

	useEffect(() => {
		setInfo(props.item);
	}, [props.item]);

	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate(props.ruta, { garantiaEtapa: props.etapa, detalle: info.Detalle }) : null}>
			<View style={CardStyles.card}>
				<View style={{flex: 1, alignItems: 'flex-start'}}>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="map-marked-alt"/>
						<Text style={{ padding: 5, fontSize: 20, textAlign: 'center' }}>{info.NombreProyecto}</Text>
					</View>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="home"/>
						<Text style={{ padding: 5, fontSize: 20, textAlign: 'center' }}>{info.Numero}</Text>
					</View>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="map-marker-alt"/>
						<Text style={{ padding: 5, fontSize: 20, textAlign: 'center' }}>{info.NombreArea}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardGarantia;