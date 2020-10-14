import React from 'react';
import { ScrollView, Text, View, TextInput, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Componentes
import SelectVivienda from '../../../components/select/SelectVivienda';
import SelectArea from '../../../components/select/SelectArea';
import SelectObjeto from '../../../components/select/SelectObjeto';
import SelectProblema from '../../../components/select/SelectProblema';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';

// Styles
import TextStyle from '../../../styles/text';

function Etapa1() {
	const EmptyImage = require('../../../../assets/picture_icon.png');
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
				<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '30%'}}>
					<FontAwesome5 name="camera" size={45}/>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '70%'}}>
					<Image source={EmptyImage} style={{width: 60, height: 60}}/>
					<Image source={EmptyImage} style={{width: 60, height: 60}}/>
					<Image source={EmptyImage} style={{width: 60, height: 60}}/>
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