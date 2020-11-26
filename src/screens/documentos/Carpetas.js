import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import Carpetas from '../../components/documentos/Carpetas';

// Styles
import Styles from '../../styles/screens/DocumentosStyle';

const request = new Request();

function Documentos({ navigation }) {
	const [lista, setLista] = useState([]);

	async function getCarpetas() {
		const response = await request.get('/app/documentos/get/folders');

		if (response.error) {
			alert(response.message || 'No se pudieron obtener las carpetas');
		}

		if (Array.isArray(response.data)) {
			setLista(response.data)
		}
	}

	useEffect(() => {
		getCarpetas();
	}, []);

	async function reload() {
		await getCarpetas();
	}

	return (
		<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
			<View style={Styles.backGround}>
				<Container>
					<Carpetas
						navigation 	= {navigation}
						lista 		= {lista}
						reload		= {reload.bind(this)}/>
				</Container>
			</View>
		</ImageBackground>
	);
}

export default Documentos;