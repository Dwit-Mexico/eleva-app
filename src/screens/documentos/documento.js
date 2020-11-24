import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';

// Componentes

function Documento() {
	const [loading, setLoading] = useState(true);
	const [url, setUrl] = useState('');
	const route = useRoute();

	if(route.params) {
		useEffect(() => {
			const { data } = route.params;
			if(data) {
				setUrl(data.path);
			}
		}, [route.params]);
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{height: loading? '80%': '100%', width: '100%'}}>

				{loading &&
				<View style={{height: '20%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Text>Descargando archivo...</Text>
				</View>}

				<View style={{height: loading? '80%': '100%', width: '100%'}}>
					<PDFReader
						source={{
							uri: url,
						}}
						withPinchZoom	=	{true}
						onLoadEnd = {(event) => setLoading(false)}
					/>
				</View>
			</View>
		</View>
	);
}

export default Documento;