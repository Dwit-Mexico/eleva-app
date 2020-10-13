import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';

// Componentes
import Container from '../../components/container';
import ListaViviendas from '../../components/lista-viviendas';

// Styles
import Styles from '../../styles/screens/Perfil';
import StylesButtons from '../../styles/buttons';
import StylesTexts from '../../styles/text';

function _logOut(context) {
	if (context) {
		context.logout();
	}
}

function Perfil({context}) {
	return (
		<Container>
			<Text>Mariano Rodriguez</Text>
			<View style={{height: 8}}/>
			<Text>Calle 18 PTE Mz98 Lote 13 Region 91</Text>
			<View style={{height: 32}}/>
			<ListaViviendas/>
			<View style={Styles.logoutButtonView}>
				<TouchableOpacity onPress={_logOut.bind(this, context)} style={StylesButtons.logoutButton}>
					<Text style={StylesTexts.logoutButton}>Cerrar sesión</Text>
				</TouchableOpacity>
			</View>
		</Container>
	);
}

export default Consumer(Perfil);