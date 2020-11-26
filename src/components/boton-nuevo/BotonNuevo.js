import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Consumer } from '../../context';

function BotonNuevo({navigation, screen, context}) {

	function nuevoReporte() {
		// Reinicializa los valores al salir y entrar en el wizard
		console.log('reinicializar');
		if(context) {
			context.setStep(1);
			context.setUnidad(null);
			context.setArea(null);
			context.setEquipo(null);
			context.setProblema(null);
			context.setComentario(null);
			context.setImagen1(null);
			context.setImagen2(null);
			context.setImagen3(null);
		}

		navigation.navigate(screen);
	}

	return (
		<View style={{}}>
			<TouchableOpacity onPress={nuevoReporte.bind(this)} style={{backgroundColor: '#B29360', borderRadius: 50, paddingTop: 8, padding: 10, paddingBottom: 8}}>
				<FontAwesome5 name="plus" size={20} color={"#fff"}/>
			</TouchableOpacity>
		</View>
	);
}

export default Consumer(BotonNuevo);