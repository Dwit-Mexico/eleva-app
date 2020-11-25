import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import Style from '../../styles/components/CardNotificacionStyle';

function CardNotificaciones({ navigation, item }) {
	const mensaje = item.Mensaje.length > 15? `${item.Mensaje.substring(0, 15)}...` : item.Mensaje;
	return (
		<TouchableOpacity style={Style.card} onPress={() => alert(item.Mensaje)}>
			<FontAwesome5 name="comment-dots" size={40}/>
			<Text style={{marginLeft: 25, fontSize: 18}}>{mensaje}</Text>
		</TouchableOpacity>
	);
}

export default CardNotificaciones;
