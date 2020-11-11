import React from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';
import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaGarantia = ({ navigation }) => {
	return (
		<Container>
			<ListaGarantias navigation={navigation} etapa = {2}/>
		</Container>
	)
}

export default Consumer(ListaGarantia);
