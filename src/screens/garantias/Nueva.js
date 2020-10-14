import React from 'react';
import { Text } from 'react-native';

//Etapas
import Etapa1 from './etapas/Etapa1';

//Componentes
import Container from '../../components/container';

function NuevaGarantia() {
	return (
		<Container>
			<Etapa1 />
		</Container>
	);
}

export default NuevaGarantia;