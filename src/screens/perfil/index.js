import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';

//Componentes
import Container from '../../components/container';
import ListaViviendas from '../../components/lista-viviendas';

function _logOut(context) {
	if (context) {
		context.logout();
	}
}

function Perfil({context}) {
	return (
		<Container>
			<TouchableOpacity onPress={_logOut.bind(this, context)}>
				<Text>Cerrar sesión</Text>
			</TouchableOpacity>
			<Text>Mariano Rodriguez</Text>
			<Text>Calle 18 PTE Mz98 Lote 13 Region 91</Text>
			<ListaViviendas/>
		</Container>
	);
}

export default Consumer(Perfil);