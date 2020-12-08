import React from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment-timezone';

// Styles
import Style from '../../styles/components/CardNotificacionStyle';
import Colores from '../../styles/colores';

function CardNotificaciones({ navigation, item }) {
	const mensaje = item.Mensaje.length > 15? `${item.Mensaje.substring(0, 20)}...` : item.Mensaje;
	return (
		<TouchableOpacity style={Style.card} onPress={() => Alert.alert('Notificación', item.Mensaje)}>
			<FontAwesome5 name="comment-dots" size={40} color={Colores.CardNotificacionColor}/>
			<View>
				<Text style={{marginLeft: 25, fontSize: 18, color: Colores.CardNotificacionColor}}>{mensaje}</Text>
				<Text style={{marginLeft: 25, fontSize: 12, color: Colores.CardNotificacionColor}}>{moment(item.Fecha).format('DD/MM/YYYY HH:mm')}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default CardNotificaciones;
