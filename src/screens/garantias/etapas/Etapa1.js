import React from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import SelectVivienda from '../../../components/select/SelectVivienda';
import SelectArea from '../../../components/select/SelectArea';
import SelectObjeto from '../../../components/select/SelectObjeto';
import SelectProblema from '../../../components/select/SelectProblema';

function Etapa1() {
	return (
		<ScrollView>
			<Text>Etapa 1</Text>
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
				style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top",
				fontSize: 16,}}
				multiline
				numberOfLines={6}/>
			<View style={{height: 16}}/>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
				<FontAwesome5 name="camera" size={30}/>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%'}}>
					<FontAwesome5 name="image" size={30}/>
					<FontAwesome5 name="image" size={30}/>
					<FontAwesome5 name="image" size={30}/>
				</View>
			</View>
		</ScrollView>
	);
}

export default Etapa1;