import React from 'react';
import { ScrollView, Text } from 'react-native';

//Componentes
import CardVivienda from './CardVivienda';

function ListaViviendas() {
	return (
		<ScrollView>
			<CardVivienda name="Vivienda 1" direccion= "direccion de prueba"/>
			<Text>Vivienda 2</Text>
			<Text>Vivienda 3</Text>
		</ScrollView>
	);
}

export default ListaViviendas;
