import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Animated, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect, useRoute } from '@react-navigation/native';


//Componentes
// import SelectArea from '../../../../components/select/SelectArea';

// Styles
import Styles from '../../../../styles/components/WizardStyle';

function SeleccionarFotos({ navigation, esDetalle, imagenes }) {
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
			console.log('opacity');
			initOpactity();
		}, [imagenIndex])
	)

	function _borrarImagen() {
		switch(imagenIndex) {
			case 1: 
				setImagen1(null);
				break;
			case 2: 
				setImagen2(null);
				break;
			case 3: 
				setImagen3(null);
				break;
		}
		setModalImagen(false);
		navigation.navigate('Camara', { imagenIndex });
	}

	function _openCamara(navigation, index, imagen) {
		if (imagen) {
			setModalImagen(true);
			setZoomImagen(imagen);
			setimagenIndex(index);
			return;
		}
		if (navigation) {
			navigation.navigate('Camara', { imagenIndex: index, esDetalle });
		}
	}

	const ImagenButton = ({ navigation, index, imagen }) => {
		const EmptyImage = require('../../../../../assets/picture_icon.png');

		return (
			<View style={{width: 170, height: 140, padding: 10}}>
				<TouchableOpacity onPress={_openCamara.bind(this, navigation, index, imagen, _borrarImagen)}>
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