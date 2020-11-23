import React, { useState } from 'react';

// Componentes
import Container from '../../components/container';
import Lista from '../../components/documentos/Lista';

function ListaDocumentos({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [url, setUrl] = useState('http://www.africau.edu/images/default/sample.pdf');

	return (
		<Container>
			<Lista
				navigation 	= {navigation}
				lista 		= {[{id: 1, name: "Test" }, { id:2, name: "Test1"}]}/>
		</Container>
	);
}

export default ListaDocumentos;