import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BotonNotificaciones = (props) => {
	const { navigation } = props;
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
			<Text>N</Text>
		</TouchableOpacity>
	)
}

export default BotonNotificaciones;
