import React, { useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

//Etapas
import Etapa1 from './etapas/Etapa1';
import Etapa2 from './etapas/Etapa2';
import Etapa3 from './etapas/Etapa3';

//Componentes
import Container from '../../components/container';

function DetalleGarantia() {

	const [etapa, setEtapa] = useState(0);

	const route = useRoute();

	useFocusEffect(() => {
		if (route.params) {
			const { garantiaEtapa } = route.params;
			setEtapa(garantiaEtapa)
		}
	})

	const Etapa = ({ etapaIndex }) => {
		switch(etapaIndex) {
			case 1: return <Etapa1/>
			case 2: return <Etapa2/>
			case 3: return <Etapa3/>
			default: return null
		}
	}

	return (
		<Container>
			<Etapa etapaIndex = {etapa}/>
		</Container>
	);
}

export default DetalleGarantia;