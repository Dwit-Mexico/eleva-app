import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import ListaNotificaciones from '../../components/notificaciones/Lista';

// Styles
import Styles from '../../styles/screens/DocumentosStyle';
import Colores from '../../styles/colores';

const request = new Request();

function Notificaciones() {
	const [loading, setLoading] = useState(true);
	const [lista, setLista] = useState([]);

	async function getNotificaciones() {
		const response = await request.get('/aplicacion/notificaciones/get');

		if (response.error) {
			Alert.alert('No se pudieron obtener notificaciones');
		}

		if (Array.isArray(response.data)) {
			setLista(response.data)
		}

		setLoading(false);
	}

	useEffect(() => {
		getNotificaciones();
	}, []);

	async function reload() {
		await getNotificaciones();
	}

	return (
		<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1}}>
			<View style={Styles.backGround}>
				<Container>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						{loading ? 
							<ActivityIndicator color={Colores.spinnerColor} size={30}/>
							:
							<View style={{width: '100%', height: '100%'}}>
								<ListaNotificaciones
									lista 	=	{lista}
									reload 	=	{reload.bind(this)}/>
							</View>
						}
					</View>
				</Container>
			</View>
		</ImageBackground>
	);
}

export default Notificaciones;