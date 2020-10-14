import React from 'react';
import { Text } from 'react-native';

//Etapas
import Etapa1 from './etapas/Etapa1';

//Componentes
import Container from '../../components/container';

function DetalleGarantia() {
	return (
		<Container>
			<Etapa1/>
		</Container>
	);
}

export default DetalleGarantia;