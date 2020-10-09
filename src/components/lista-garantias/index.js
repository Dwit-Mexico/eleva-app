import React from 'react';
import { ScrollView, Text } from 'react-native';

//Componentes
import CardGarantia from './CardGarantia';

function ListaViviendas() {
	return (
		<ScrollView>
			<CardGarantia proyecto="" name="Vivienda 1" direccion= "direccion de prueba" fecha="2020/10/21"/>
			<CardGarantia proyecto="" name="Vivienda 2" direccion= "direccion de prueba 2" fecha="2020/10/21"/>
			<CardGarantia proyecto="" name="Vivienda 3" direccion= "direccion de prueba 3" fecha="2020/10/21"/>
		</ScrollView>
	);
}

export default ListaViviendas;