import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, View, Animated, Text, TouchableOpacity, Modal, Image, Platform, Linking, Button } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';

import Styles from '../../../../styles/components/WizardStyle';

function SeleccionarFotos({ navigation, imagenes, context }) {

	let animatedOpacity = useRef(new Animated.Value(0)).current;

	const [imagen1, setImagen1] = useState(imagenes.imagen1 || null);
	const [imagen2, setImagen2] = useState(imagenes.imagen2 || null);
	const [imagen3, setImagen3] = useState(imagenes.imagen3 || null);
	const [video1, setVideo1] = useState(null);
	const [imagenIndex, setimagenIndex] = useState(null);
	const [videoIndex, setVideoIndex] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [modalVideo, setModalVideo] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);

	function initOpactity() {

		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();

	};

	useFocusEffect(

		useCallback(() => {

			initOpactity();

			if (context.imagen1) {
				setImagen1(context.imagen1);
			};

			if (context.imagen2) {
				setImagen2(context.imagen2);
			};

			if (context.imagen3) {
				setImagen3(context.imagen3);
			};

			if (context.video1) {
				setVideo1(context.video1);
			};

		}, [])
	);

	useEffect(() => {

		async function permisoCamara() {

			const { status: existingStatus } = await Permissions.getAsync(Permissions.CAMERA);

			let finalStatus = existingStatus;

			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.CAMERA);
				finalStatus = status;
			};
		};

		permisoCamara();

	}, []);

	async function usarCamara(index) {

		let resultPermissions = null

		resultPermissions = await Permissions.askAsync(Permissions.CAMERA);

		if (resultPermissions.status === "denied") {

			if (resultPermissions.canAskAgain) {

				Alert.alert('Permisos', "Para tomar fotos o video, permite que Eleva pueda usar la cámara.");

			} else {

				if (Platform.OS == 'ios') {

					Alert.alert(
						'Permisos',
						'Para tomar fotos o video, permite que Eleva pueda usar la cámara, tienes que ir a ajustes y activarlos manualmente el permiso.',
						[
							{
								text: "ir a configuración",
								onPress: () => Linking.openURL('app-settings:')
							}
						],
					);

				} else {
					Alert.alert('Permisos', "Para tomar fotos o video, permite que Eleva pueda usar la cámara, tienes que ir a ajustes y activarlos manualmente el permiso.");
				};
			};

			return;
		};

		if (index == 4) {

			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				aspect: [4, 3],
				quality: 1,
				videoMaxDuration: 30
			});

			if (!result.cancelled) {

				context.setVideo1(result);
				setVideo1(result);
			};

		} else {

			let result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {

				if (index == 1) {
					context.setImagen1(result);
					setImagen1(result);
				};

				if (index == 2) {
					context.setImagen2(result);
					setImagen2(result);
				};

				if (index == 3) {
					context.setImagen3(result);
					setImagen3(result);
				};
			};
		};

	};

	function _borrarImagen() {

		switch (imagenIndex) {
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
		};

		setModalImagen(false);

		usarCamara(imagenIndex)
	};

	function _borrarVideo() {

		setVideo1(null);

		context.setVideo1(null);

		setModalVideo(false);

		usarCamara(videoIndex)
	};

	async function _openCamara(index, imagen, video) {

		if (imagen) {

			setModalImagen(true);
			setZoomImagen(imagen);
			setimagenIndex(index);

			return;
		};

		if (video) {

			setModalVideo(true);
			setVideoIndex(index);

			return;
		};

		usarCamara(index);
	};

	const ImagenButton = ({ index, imagen }) => {

		const EmptyImage = require('../../../../../assets/picture_icon.png');

		return (
			<View style={{ width: 170, height: 140, padding: 10 }}>
				<TouchableOpacity onPress={_openCamara.bind(this, index, imagen, null)}>
					<Image source={imagen || EmptyImage} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
				</TouchableOpacity>
			</View>
		);
	};

	const VideoButton = ({ index, video }) => {

		const EmptyImage = require('../../../../../assets/video1.png');

		return (
			<View style={{ width: 170, height: 140, padding: 10 }}>
				<TouchableOpacity onPress={_openCamara.bind(this, index, null, video)}>
					<Image
						source={video1 || EmptyImage}
						style={{ width: '100%', height: '100%' }}
						resizeMode='cover'
					/>
					{video1 &&
						<View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
							<FontAwesome5
								name="play-circle"
								size={35}
								color="#fff"
							/>
						</View>}
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Animated.View
				style={{
					flex: 1,
					height: '100%',
					opacity: animatedOpacity
				}}
			>
				<Text style={Styles.titleStyle}>¿Tienes fotos o video del detalle?</Text>

				<View style={{ height: 8 }} />

				<View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
					<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<ImagenButton index={1} imagen={imagen1} navigation={navigation} />
						<ImagenButton index={2} imagen={imagen2} navigation={navigation} />
						<ImagenButton index={3} imagen={imagen3} navigation={navigation} />
						<VideoButton index={4} video={video1} navigation={navigation} />
					</View>
				</View>
			</Animated.View>
			<Modal
				visible={modalImagen}
				transparent={true}
				onBackButtonPress={() => setModalImagen(false)}
			>
				<View style={{ flex: 1, backgroundColor: '#000' }}>
					<View style={{ flex: 0.1, padding: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
						<TouchableOpacity onPress={() => setModalImagen(false)}>
							<FontAwesome5 name="times" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
					<ImageZoom
						imageUrls={zoomImagen ? [{ url: zoomImagen.uri }] : []}
						renderIndicator={() => null}
						saveToLocalByLongPress={false}
					/>
					<View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity onPress={() => _borrarImagen()}>
							<FontAwesome5 name="edit" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal
				visible={modalVideo}
				transparent={true}
				onBackButtonPress={() => setModalVideo(false)}
			>
				<View style={{ flex: 1, backgroundColor: '#000' }}>
					<View style={{ flex: 0.1, padding: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
						<TouchableOpacity onPress={() => setModalVideo(false)}>
							<FontAwesome5 name="times" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
					<Video						
						style={{ flex: 1 }}
						source={video1}
						useNativeControls
						resizeMode="cover"
						onPlaybackStatusUpdate={status => status.didJustFinish ? setModalVideo(false) : null}
						shouldPlay
					/>
					<View style={{ flexDirection: 'row', paddingVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity onPress={() => _borrarVideo()}>
							<FontAwesome5 name="edit" size={35} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default Consumer(SeleccionarFotos);