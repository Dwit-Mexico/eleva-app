import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

// Styles
import BotonStyles from '../../styles/buttons';


const BotonAccion = (props) => {
	if (props.loading) {
		return (
			<TouchableOpacity onPress={() => props.onPress()} style={BotonStyles.button}>
				<ActivityIndicator color={BotonStyles.spinner.color}/>
			</TouchableOpacity>
		)
	}

	if (props.disabled) {
		return (
			<TouchableOpacity>
				{props.children}
			</TouchableOpacity>
		)
	}

	return (
		<TouchableOpacity onPress={() => props.onPress()} style={BotonStyles.button}>
			{props.children}
		</TouchableOpacity>
	)
}

export default BotonAccion;
