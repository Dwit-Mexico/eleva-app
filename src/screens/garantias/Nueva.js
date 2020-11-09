import React from 'react';
import { Text } from 'react-native';

//Etapas
import Etapa1 from './etapas/Etapa1';

//Componentes
import Container from '../../components/container';

function NuevaGarantia({navigation}) {

	const Etapa = () => {
		return <Etapa1 navigation={navigation} esDetalle={false}/>
	}

	return (
		<Container>
			<Etapa />
		</Container>
	);
}

export default NuevaGarantia;