import React, { useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

//Etapas
import Etapa1 from './etapas/Etapa1';
import Etapa2 from './etapas/Etapa2';
import Etapa3 from './etapas/Etapa3';

//Componentes
import Container from '../../components/container';

function DetalleGarantia({navigation}) {

	const [etapa, setEtapa] = useState(0);
	const [esDetalle, setEsDetalle] = useState(false);

	const route = useRoute();

	useFocusEffect(() => {
		if (route.params) {
			const { garantiaEtapa, detalle } = route.params;
			setEtapa(garantiaEtapa);
			setEsDetalle(detalle)
		}
	})

	const Etapa = ({ etapaIndex, navigation }) => {
		switch(etapaIndex) {
			case 1: return <Etapa1 navigation = {navigation} esDetalle = {esDetalle}/>
			case 2: return <Etapa2 navigation = {navigation}/>
			case 3: return <Etapa3 navigation = {navigation}/>
			default: return null
		}
	}

	return (
		<Container>
			<Etapa etapaIndex = {etapa} navigation = {navigation}/>
		</Container>
	);
}

export default DetalleGarantia;