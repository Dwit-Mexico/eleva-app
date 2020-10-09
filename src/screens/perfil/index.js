import React from 'react';
import { Text } from 'react-native';

//Componentes
import Container from '../../components/container';
import ListaViviendas from '../../components/lista-viviendas';

function Perfil() {
	return (
		<Container>
			<Text>Mariano Rodriguez</Text>
			<Text>Calle 18 PTE Mz98 Lote 13 Region 91</Text>
			<ListaViviendas/>
		</Container>
	);
}

export default Perfil;