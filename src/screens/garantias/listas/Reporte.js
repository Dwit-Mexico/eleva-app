import React from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaReporte = ({ navigation }) => {
	return (
		<Container>
			<ListaGarantias navigation={navigation} etapa = {1}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	)
}

export default Consumer(ListaReporte);