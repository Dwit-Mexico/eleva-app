import React from 'react';
import { ScrollView } from 'react-native';

//Componentes
import CardGarantia from './CardDetalleGarantia';

function ListaViviendas({navigation}) {
	return (
		<ScrollView>
			<CardGarantia
				etapa = {1}
				navigation={navigation}
				proyecto="Demo1"
				name="Vivienda 1"
				direccion= "direccion de prueba"
				area="cocina"
				fecha="2020/10/21"/>
			<CardGarantia
				etapa = {2}
				navigation={navigation}
				proyecto="Demo1"
				name="Vivienda 2"
				direccion= "direccion de prueba 2"
				area="comedor"
				fecha="2020/10/21"/>
			<CardGarantia
				etapa = {3}
				navigation={navigation}
				proyecto="Demo1"
				name="Vivienda 3"
				direccion= "direccion de prueba 3"
				area="dormitorio"
				fecha="2020/10/21"/>
		</ScrollView>
	);
}

export default ListaViviendas;
