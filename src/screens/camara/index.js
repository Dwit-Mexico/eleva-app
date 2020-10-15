import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Linking, Platform, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Componentes
import Container from '../../components/container';

//Styles
// import Styles from '../../styles/components/ContainerStyle';

let camara = null;
const Camara = () => {
	StatusBar.setBarStyle('light-content');

	const navigation = useNavigation();
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [imagenes, setImagenes] = useState([]);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	async function _getPermisos() {
		if (Platform.OS == 'ios') {
			Linking.openURL('app-settings:');
		} else {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		}
	}

	function _activarFlash() {
		if (flash !== 0) {
			setFlash(Camera.Constants.FlashMode.off);
		} else {
			setFlash(Camera.Constants.FlashMode.on);
		}
	}

	async function _tomarFoto() {
		if (camara) {
			if (imagenes.length >= 3) {
				alert('Solo se permiten hasta 3 imagenes por garantía');
				return;
			}
			const picture = await camara.takePictureAsync();
			setImagenes([...imagenes, picture]);
		}
	}

	async function _aceptarFotos() {
		if (navigation.canGoBack()) {
			navigation.setParams(imagenes);
			navigation.navigate('NuevaGarantia', { imagenes });
		}
	}

	if (!hasPermission) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
				<TouchableOpacity onPress={_getPermisos.bind(this)}>
					<Text style={{color: 'white'}}>Activar Permisos de cámara</Text>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={{flex: 1, backgroundColor: '#000'}}>
			<Container>
				<View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50, marginTop: 50}}>
					<TouchableOpacity onPress={_activarFlash.bind(this)} style={{marginRight: 20}}>
						{flash === Camera.Constants.FlashMode.off?
							<MaterialIcons name="flash-off" size={30} color="white" />
							:
							<MaterialIcons name="flash-on" size={30} color="white" />
						}
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<FontAwesome5 name="times" color={'white'} size={30}/>
					</TouchableOpacity>
				</View>
				<Camera
					type		=	{ type }
					flashMode	=	{ flash }
					style		=	{ {flex: 1} }
					ref={ref => {
						camara = ref;
					}}
				>
					<View style={{position: 'absolute', bottom: 10, left: '45%'}}>
						<TouchableOpacity onPress={_tomarFoto.bind(this)} style={{backgroundColor: 'white', padding: 10, borderRadius: 50}}>
							<FontAwesome5 name="camera" size={35} color="black" />
						</TouchableOpacity>
					</View>
				</Camera>
				<View style={{marginVertical: 20, height: 80, flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
					{imagenes.length > 0 && imagenes.map((imagen, key) => <Image key={key} source={{uri: imagen.uri}} style={{width: 80, height: 80, marginHorizontal: 20}}/>)}
				</View>
				<TouchableOpacity onPress={_aceptarFotos.bind(this)} style={{marginTop: 30, alignItems: 'center', flex: 0.1}}>
					<FontAwesome5 name="check" size={35} color="green" />
				</TouchableOpacity>
				<View style={{height: 32}}/>
			</Container>
		</View>
	)
}

export default Camara;