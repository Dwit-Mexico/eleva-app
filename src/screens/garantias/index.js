import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import Container from '../../components/container';
import ListaGarantias from '../../components/lista-garantias';
import BotonNuevo from '../../components/boton-nuevo/BotonNuevo';

function Garantias({navigation}) {
	return (
		<Container>
			<ListaGarantias navigation={navigation}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	);
}

export default Garantias;