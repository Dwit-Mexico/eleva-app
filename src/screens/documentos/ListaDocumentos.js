import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import Lista from '../../components/documentos/Lista';

const request = new Request();

function ListaDocumentos({ navigation }) {
	const [lista, setLista] = useState([]);
	const route = useRoute();

	async function getDocumentos() {
		const { data } = route.params;

		if(!data) {
			alert('No se obtuvo informacion de carpeta');
			navigation.goBack();
			return;
		}

		const response = await request.get('/app/documentos/get', { IdFolder: data.IdFolder });

		if (response.error) {
			alert(response.message || 'No se pudieron obtener las carpetas');
		}

		if (Array.isArray(response.data)) {
			setLista(response.data)
		}
	}

	useEffect(() => {
		getDocumentos();
	}, []);

	async function reload() {
		getDocumentos();
	}

	return (
		<Container>
			<Lista
				navigation 	= 	{navigation}
				lista 		= 	{lista}
				reload		=	{reload.bind(this)}/>
		</Container>
	);
}

export default ListaDocumentos;