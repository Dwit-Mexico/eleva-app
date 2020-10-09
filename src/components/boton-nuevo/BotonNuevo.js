import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function BotonNuevo({navigation, screen}) {
	return (
		<View style={{position: 'absolute', right: 15, bottom: 15}}>
			<TouchableOpacity onPress={() => navigation.navigate(screen)}>
				<FontAwesome5 name="plus" size={25}/>
			</TouchableOpacity>
		</View>
	);
}

export default BotonNuevo;