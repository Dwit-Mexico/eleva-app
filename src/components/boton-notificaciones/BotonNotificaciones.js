import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import Styles from '../../styles/components/BotonNotificacionesStyle';

const BotonNotificaciones = (props) => {
	const { navigation } = props;
	return (
		<TouchableOpacity style={Styles.boton} onPress={() => navigation.navigate('Notificaciones')}>
			<FontAwesome5 name="bell" size={25}/>
		</TouchableOpacity>
	)
}

export default BotonNotificaciones;
