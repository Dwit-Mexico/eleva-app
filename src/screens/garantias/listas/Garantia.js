import React from 'react';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import ListaGarantias from '../../../components/lista-garantias-detalle';

const ListaGarantia = ({ navigation }) => {
	return (
		<Container>
			<ListaGarantias navigation={navigation} etapa = {2}/>
		</Container>
	)
}

export default Consumer(ListaGarantia);
