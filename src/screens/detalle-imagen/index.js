import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import Container from '../../components/container';

const DetalleImagen = (props) => {
	const [imagen, setImagen] = useState(null);
	const [imagenIndex, setImagenIndex] = useState(0);

	const route = useRoute();

	useFocusEffect(() => {
		const { imagen, imagenIndex } = route.params;
		setImagen(imagen);
		setImagenIndex(imagenIndex);
	});

	function cambiarImagen() {
		const params = route.params;
		if (params.borrarImagen) {
			params.borrarImagen(imagenIndex);
			const navigation = props.navigation;
			navigation.navigate('Camara', { imagenIndex });
		}
	}

	return (
		<Container>
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Image source={imagen} style={{flex: 1}} resizeMode='contain'/>
				</View>
				<View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
					<View>
						<TouchableOpacity onPress={cambiarImagen.bind(this)}>
							<FontAwesome5 name="edit" size={35} color="#000" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Container>
	)
}

export default DetalleImagen;
