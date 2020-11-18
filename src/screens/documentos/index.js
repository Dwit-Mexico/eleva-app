import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'

// Componentes
import Container from '../../components/container';

function Documentos() {
	const [loading, setLoading] = useState(true);

	return (
		<Container>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Documentos</Text>
				<View style={{height: loading? '80%': '100%', width: '100%'}}>
					<PDFReader
						source={{
							uri: 'http://www.africau.edu/images/default/sample.pdf',
						}}
						withPinchZoom	=	{true}
						onLoadEnd = {(event) => setLoading(false)}
					/>
				</View>
			</View>
		</Container>
	);
}

export default Documentos;