import React from 'react';
import { ScrollView } from 'react-native';

//Componentes
import CardGarantia from './CardGarantia';

function ListaViviendas() {
	return (
		<ScrollView>
			<CardGarantia proyecto="Demo1" name="Vivienda 1" direccion= "direccion de prueba" area="cocina" fecha="2020/10/21"/>
			<CardGarantia proyecto="Demo1" name="Vivienda 2" direccion= "direccion de prueba 2" area="comedor" fecha="2020/10/21"/>
			<CardGarantia proyecto="Demo1" name="Vivienda 3" direccion= "direccion de prueba 3" area="dormitorio" fecha="2020/10/21"/>
		</ScrollView>
	);
}

export default ListaViviendas;