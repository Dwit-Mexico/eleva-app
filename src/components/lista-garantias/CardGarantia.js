import React, { useState, useEffect } from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment-timezone';

//Styles
import CardStyles from '../../styles/components/CardGarantiaStyle';

function CardGarantia(props) {
	const [info, setInfo] = useState({});

	useEffect(() => {
		setInfo(props.item);
	}, [props.item]);

	return (
		<TouchableOpacity
			style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
			onPress={()=> props.navigation? props.navigation.navigate(props.ruta, { garantiaEtapa: props.etapa, IdUnidad: info.IdUnidad,  IdArea: info.IdArea, info: info}) : null}>
			<View style={CardStyles.card}>
				<View style={{alignItems: 'flex-start', width: '100%'}}>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="map-marked-alt"/>
						<Text style={{ padding: 2, fontSize: 19, textAlign: 'center' }}>{info.NombreProyecto}</Text>
					</View>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="home"/>
						<Text style={{ padding: 2, fontSize: 19, textAlign: 'center' }}>{info.Numero}</Text>
					</View>
					<View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
						<FontAwesome5 name="map-marker-alt"/>
						<Text style={{ padding: 2, fontSize: 19, textAlign: 'center' }}>{info.NombreArea}</Text>
					</View>
				</View>
				<View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%'}}>
					<Text style={{ padding: 2, fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{moment(info.Fecha).tz('GMT').format('DD/MM/YYYY')}</Text>
					<Text style={{ padding: 2, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#BFB2AC' }}>{info.NoSolicitud}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardGarantia;