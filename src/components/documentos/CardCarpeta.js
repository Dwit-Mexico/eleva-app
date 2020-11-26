import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import Style from '../../styles/components/CardCarpetaStyle';
import Colores from '../../styles/colores';

function ListaViviendas({ navigation, item }) {
	return (
		<TouchableOpacity style={Style.card} onPress={() => navigation.navigate('ListaDocumentos', { data: item, title: item.NombreFolder })}>
			<FontAwesome5 name="folder" size={40} color={Colores.CardCarpetaColor}/>
			<Text style={Style.text}>{item.NombreFolder.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}

export default ListaViviendas;
