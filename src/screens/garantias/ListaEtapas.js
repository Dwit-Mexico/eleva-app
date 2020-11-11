import React, { useEffect } from 'react';
import { Animated } from 'react-native';

// Componentes
import Container from '../../components/container';
import ListaEtapas from '../../components/lista-etapas';
// import BotonNuevo from '../../components/boton-nuevo/BotonNuevo';

function Garantias({navigation}) {
	return (
		<Container>
			<ListaEtapas navigation={navigation}/>
		</Container>
	);
}

export default Garantias;