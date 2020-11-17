import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function BotonNuevo({navigation, screen}) {
	return (
		<View style={{}}>
			<TouchableOpacity onPress={() => navigation.navigate(screen)} style={{backgroundColor: '#B29360', borderRadius: 50, paddingTop: 8, padding: 10, paddingBottom: 8}}>
				<FontAwesome5 name="plus" size={20} color={"#fff"}/>
			</TouchableOpacity>
		</View>
	);
}

export default BotonNuevo;