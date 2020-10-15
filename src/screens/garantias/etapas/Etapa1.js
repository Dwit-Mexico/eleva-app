import React, { useState } from 'react';
import { StatusBar, ScrollView, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';

// Componentes
import SelectVivienda from '../../../components/select/SelectVivienda';
import SelectArea from '../../../components/select/SelectArea';
import SelectObjeto from '../../../components/select/SelectObjeto';
import SelectProblema from '../../../components/select/SelectProblema';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';

// Styles
import TextStyle from '../../../styles/text';

function _openCamara(navigation) {
	if (navigation) {
		navigation.navigate('MyModal');
	}
}

function Etapa1({navigation}) {

	const [imagenes, setImagenes] = useState([]);
	const route = useRoute();
	const EmptyImage = require('../../../../assets/picture_icon.png');

	useFocusEffect(() => {

		StatusBar.setBarStyle('dark-content');

		if (route.params) {
			const { imagenes } = route.params;
			if (Array.isArray(imagenes)) {
				setImagenes(imagenes);
			}
		}
	});

	return (
		<ScrollView>
			<Text style={TextStyle.EtapaTitulo}>Etapa 1</Text>
			<View style={{height: 8}}/>
			<SelectVivienda onChange = {(data) => console.log('SelectVivienda', data)}/>
			<View style={{height: 8}}/>
			<SelectArea onChange = {(data) => console.log('SelectArea', data)}/>
			<View style={{height: 8}}/>
			<SelectObjeto onChange = {(data) => console.log('SelectObjeto', data)}/>
			<View style={{height: 8}}/>
			<SelectProblema onChange = {(data) => console.log('SelectProblema', data)}/>
			<View style={{height: 8}}/>
			<TextInput
				placeholder="< Escriba sus comentarios >"
				style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
				multiline
				numberOfLines={6}
				maxLength={1500}/>
			<View style={{height: 16}}/>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
				<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '25%'}}>
					<TouchableOpacity onPress={_openCamara.bind(this, navigation)}>
						<FontAwesome5 name="camera" size={60}/>
					</TouchableOpacity>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
					<Image source={imagenes[0] || EmptyImage} style={{width: 80, height: 80}}/>
					<Image source={imagenes[1] || EmptyImage} style={{width: 80, height: 80}}/>
					<Image source={imagenes[2] || EmptyImage} style={{width: 80, height: 80}}/>
				</View>
			</View>
			<View style={{height: 32}}/>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				<BotonEnviar onSubmit = {(submit) => console.log(submit)}/>
			</View>
		</ScrollView>
	);
}

export default Etapa1;