import React, { useState, useEffect } from 'react';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import Carpetas from '../../components/documentos/Carpetas';

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
		<Container>
			<Carpetas
				navigation 	= {navigation}
				lista 		= {lista}
				reload		= {reload.bind(this)}/>
		</Container>
	);
}

export default Documentos;