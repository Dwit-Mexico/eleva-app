import React from 'react';
import { Text } from 'react-native';

//Etapas
import Wizard from './etapas/Wizard';

//Componentes
import Container from '../../components/container';

function NuevaGarantia({navigation}) {

	const Etapa = () => {
		return <Wizard navigation={navigation} esDetalle={false}/>
	}

	return (
		<Container>
			<Etapa />
		</Container>
	);
}

export default NuevaGarantia;