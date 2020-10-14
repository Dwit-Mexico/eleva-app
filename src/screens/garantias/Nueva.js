import React from 'react';
import { Text } from 'react-native';

//Etapas
import Etapa1 from './etapas/Etapa1';

//Componentes
import Container from '../../components/container';

function NuevaGarantia({navigation}) {
	return (
		<Container>
			<Etapa1 navigation={navigation}/>
		</Container>
	);
}

export default NuevaGarantia;