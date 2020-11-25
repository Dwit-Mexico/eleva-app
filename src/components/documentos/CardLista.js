import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Styles
import Style from '../../styles/components/CardCarpetaStyle';

function ListaDocumentos({ navigation, item }) {
	return (
		<TouchableOpacity style={Style.card} onPress={() => navigation.navigate('VistaDocumento', { data: item })}>
			<FontAwesome5 name="file-pdf" size={40}/>
			<Text style={{marginLeft: 25, fontSize: 18}}>{item.NombreDocumento}</Text>
		</TouchableOpacity>
	);
}

export default ListaDocumentos;

