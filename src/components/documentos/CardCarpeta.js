import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import Style from '../../styles/components/CardCarpetaStyle';
import Colores from '../../styles/colores';

function ListaViviendas({ navigation, item }) {
	return (
		<TouchableOpacity style={Style.card} onPress={() => navigation.navigate('ListaDocumentos', { data: item })}>
			<FontAwesome5 name="folder" size={40}/>
			<Text style={{marginLeft: 25, fontSize: 18}}>Carpeta</Text>
		</TouchableOpacity>
	);
}

export default ListaViviendas;
