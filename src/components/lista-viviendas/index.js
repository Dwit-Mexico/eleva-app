import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

//Componentes
import CardVivienda from './CardVivienda';

function ListaViviendas() {
	return (
		<ScrollView
			style = {{height: '50%'}}
			refreshControl = {
				<RefreshControl refreshing={false} onRefresh={() => console.log('on refresh')} />
			}>
			<CardVivienda name="Vivienda 1" direccion= "direccion de prueba" fecha="2020/10/21"/>
			<CardVivienda name="Vivienda 2" direccion= "direccion de prueba 2" fecha="2020/10/21"/>
			<CardVivienda name="Vivienda 3" direccion= "direccion de prueba 3" fecha="2020/10/21"/>
			<CardVivienda name="Vivienda 4" direccion= "direccion de prueba 3" fecha="2020/10/21"/>
		</ScrollView>
	);
}

export default ListaViviendas;
