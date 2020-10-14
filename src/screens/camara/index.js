import React from 'react';
import { View } from 'react-native';
import { Camera } from 'expo-camera';

//Styles
// import Styles from '../../styles/components/ContainerStyle';

const Camara = (props) => {
	let camara = null;
	const cameraType = Camera.Constants.Type.back;
	const flashMode = Camera.Constants.FlashMode.off;

	return (
		<View>
			<Camera
				type		=	{ cameraType }
				flashMode	=	{ flashMode }
				style		=	{ {width: '100%', height: '100%'} }
				ref			=	{ camera => camara = camera }
			/>
		</View>
	)
}

export default Camara;