import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, View, Animated, Text, TouchableOpacity, Modal, Image, Platform, Linking } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

//Componentes
// import SelectArea from '../../../../components/select/SelectArea';

// Styles
import Styles from '../../../../styles/components/WizardStyle';

function SeleccionarFotos({ navigation, imagenes, context }) {
	let animatedOpacity = useRef(new Animated.Value(0)).current;

	const [imagen1, setImagen1] = useState(imagenes.imagen1 || null);
	const [imagen2, setImagen2] = useState(imagenes.imagen2 || null);
	const [imagen3, setImagen3] = useState(imagenes.imagen3 || null);
	const [imagenIndex, setimagenIndex] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);

	const route = useRoute();
	const { params } = route;

	function initOpactity() {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}

	useFocusEffect(
		useCallback(() => {
			initOpactity();
			if (context.imagen1) {
				setImagen1(context.imagen1);
			}
			if (context.imagen2) {
				setImagen2(context.imagen2);
			}
			if (context.imagen3) {
				setImagen3(context.imagen3);
			}
		}, [])
	)

	useEffect(() => {
		async function permisoCamara() {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.CAMERA);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.CAMERA);
				finalStatus = status;
			}
		}

		permisoCamara();

	}, [])

	async function usarCamara(index) {
		let resultPermissions = null

		resultPermissions = await Permissions.askAsync(Permissions.CAMERA);

		if (resultPermissions.status === "denied") {

			if (resultPermissions.canAskAgain) {
				Alert.alert('Permisos', "Para tomar fotos, permite que Eleva pueda usar la cámara.");
			} else {
				if (Platform.OS == 'ios') {
					Alert.alert(
						'Permisos',
						'Para tomar fotos, permite que Eleva pueda usar la cámara, tienes que ir a ajustes y activarlos manualmente el permiso.',
						[
							{
								text: "ir a configuración",
								onPress: () => Linking.openURL('app-settings:')
							}
						],
					)
				} else
					Alert.alert('Permisos', "Para tomar fotos, permite que Eleva pueda usar la cámara, tienes que ir a ajustes y activarlos manualmente el permiso.");
			}

			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			if (index == 1) {
				context.setImagen1(result);
				setImagen1(result);
			}
			if (index == 2) {
				context.setImagen2(result);
				setImagen2(result);
			}
			if (index == 3) {
				context.setImagen3(result);
				setImagen3(result);
			}
		}
	}

	function _borrarImagen() {
		switch(imagenIndex) {
			case 1: 
				setImagen1(null);
				context.setImagen1(null);
				break;
			case 2: 
				setImagen2(null);
				context.setImagen2(null);
				break;
			case 3: 
				setImagen3(null);
				context.setImagen2(null);
				break;
		}
		setModalImagen(false);

		usarCamara(imagenIndex)
	}

	async function _openCamara(index, imagen) {

		if (imagen) {
			setModalImagen(true);
			setZoomImagen(imagen);
			setimagenIndex(index);
			return;
		}

		usarCamara(index);
	}

	const ImagenButton = ({ index, imagen }) => {
		const EmptyImage = require('../../../../../assets/picture_icon.png');

		return (
			<View style={{width: 170, height: 140, padding: 10}}>
				<TouchableOpacity onPress={_openCamara.bind(this, index, imagen, _borrarImagen)}>
					<Image source={imagen || EmptyImage} style={{width: '100%', height: '100%'}} resizeMode='cover'/>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={{flex: 1}}>
			<Animated.View
				style={{
					flex: 1,
					height: '100%',
					opacity: animatedOpacity,
					// backgroundColor: 'lightgray',
				}}
			>
				<Text style={Styles.titleStyle}>¿Tienes fotos del problema?</Text>

				<View style={{height: 8}}/>

				<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
					<View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
						<ImagenButton index = {1} imagen = {imagen1} navigation = {navigation}/>
						<ImagenButton index = {2} imagen = {imagen2} navigation = {navigation}/>
						<ImagenButton index = {3} imagen = {imagen3} navigation = {navigation}/>
					</View>
				</View>
			</Animated.View>
			<Modal
				visible={modalImagen}
				transparent={true}
				onBackButtonPress={() => setModalImagen(false)}>
				<View style={{flex: 1, backgroundColor: '#000'}}>
					<View style={{flex: 0.1, padding: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
						<TouchableOpacity onPress={() => setModalImagen(false)}>
							<FontAwesome5 name="times" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
					<ImageZoom
						imageUrls = {zoomImagen? [ { url: zoomImagen.uri } ] : []}
						renderIndicator = {() => null}
						saveToLocalByLongPress={false}/>
					<View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
						<TouchableOpacity onPress={() => _borrarImagen()}>
							<FontAwesome5 name="edit" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default Consumer(SeleccionarFotos);