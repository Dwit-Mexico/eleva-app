import React from 'react';
import { View } from 'react-native';

//Componentes
import Container from '../../components/container';
import ListaGarantias from '../../components/lista-garantias-detalle';
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