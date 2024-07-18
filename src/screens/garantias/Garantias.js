import React, { useEffect } from 'react';
import { Consumer } from '../../context';

//Componentes
import Container from '../../components/container';
import ListaGarantias from '../../components/lista-garantias-detalle';
import BotonNuevo from '../../components/boton-nuevo/BotonNuevo';

function Garantias({navigation, context}) {

	if (context) {
		useEffect(() => {
			if (context.initApp) {
				context.initApp();
			}
		}, []);
	}

	return (
		<Container>
			<ListaGarantias navigation={navigation}/>
			<BotonNuevo navigation={navigation} screen={'NuevaGarantia'}/>
		</Container>
	);
}

export default Consumer(Garantias);