import React from 'react';
import { Text, View } from 'react-native';

//Componentes
import SelectVivienda from '../../../components/select/SelectVivienda';
import SelectArea from '../../../components/select/SelectArea';
import SelectObjeto from '../../../components/select/SelectObjeto';
import SelectProblema from '../../../components/select/SelectProblema';

function Etapa1() {
	return (
		<>
			<Text>Etapa 1</Text>
			<View style={{height: 8}}/>
			<SelectVivienda onChange = {(data) => console.log('SelectVivienda', data)}/>
			<View style={{height: 8}}/>
			<SelectArea onChange = {(data) => console.log('SelectArea', data)}/>
			<View style={{height: 8}}/>
			<SelectObjeto onChange = {(data) => console.log('SelectObjeto', data)}/>
			<View style={{height: 8}}/>
			<SelectProblema onChange = {(data) => console.log('SelectProblema', data)}/>
		</>
	);
}

export default Etapa1;