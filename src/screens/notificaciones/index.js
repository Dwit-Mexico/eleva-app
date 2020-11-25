import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import ListaNotificaciones from '../../components/notificaciones/Lista';

const request = new Request();

function Notificaciones() {
	const [lista, setLista] = useState([]);

	async function getNotificaciones() {
		const response = await request.get('/aplicacion/notificaciones/get');

		if (response.error) {
			alert(response.message || 'No se pudieron obtener notificaciones');
		}

		if (Array.isArray(response.data)) {
			setLista(response.data)
		}
	}

	useEffect(() => {
		getNotificaciones();
	}, []);

	async function reload() {
		await getNotificaciones();
	}

	return (
		<Container>
			<ListaNotificaciones
				lista 	=	{lista}
				reload 	=	{reload.bind(this)}/>
		</Container>
	);
}

export default Notificaciones;