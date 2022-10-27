import React, { useState } from 'react';
import {
	Alert,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Image,
	Modal,
	ImageBackground,
	ActivityIndicator
} from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import Request from '../../../core/api';
import { Video } from 'expo-av';

// Componentes
import Container from '../../../components/container';
import Button from '../../../components/boton/BotonAccion';

// Styles
import Styles from '../../../styles/screens/DetalleStyle';
import Colores from '../../../styles/colores';

const request = new Request();

const DetalleReporte = ({ navigation, context }) => {

	const [info, setInfo] = useState({
		Numero: '',
		NombreArea: '',
		NombreEquipo: '',
		NombreProblema: '',
		Comentarios: '',
		IdEstado: 0
	});
	const [modalImagen, setModalImagen] = useState(false);
	const [modalVideo, setModalVideo] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);
	const [playVideo, setPlayVideo] = useState(null);
	const [loadingCancel, setLoadingCancel] = useState(false);
	const [isPreloading, setIsPreloading] = useState(true);
	const route = useRoute();

	useFocusEffect(() => {
		const params = route.params;

		if (params.data) {
			const info = params.data;
			setInfo(info || {});
		}
	});

	function _openCamara(index, imagen, video) {

		if (imagen) {

			setModalImagen(true);
			setZoomImagen(imagen);

			return;
		};

		if (video) {

			setModalVideo(true);
			setPlayVideo(video);

			return;
		};
	}

	const ImagenButton = ({ index, imagen }) => {

		console.log(imagen);

		const EmptyImage = require('../../../../assets/picture_icon.png');

		return (
			<View style={{ width: 100, height: 80, padding: 5 }}>
				<TouchableOpacity onPress={_openCamara.bind(this, index, imagen, null)}>
					<Image
						source={imagen || EmptyImage}
						style={{ width: '100%', height: '100%' }}
						resizeMode='cover'
					/>
				</TouchableOpacity>
			</View>
		)
	}

	const VideoButton = ({ index, video }) => {

		console.log(video);

		const EmptyImage = require('../../../../assets/video1.png');

		return (
			<View style={{ width: 100, height: 80, padding: 5 }}>
				<TouchableOpacity onPress={_openCamara.bind(this, index, null, video)}>
					<Image
						source={video || EmptyImage}
						style={{ width: '100%', height: '100%' }}
						resizeMode='cover'
					/>
					{video &&
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

	async function _cancelarReporte() {
		setLoadingCancel(true);

		const response = await request.post('/app/garantias/cancelar', { IdSolicitud: info.IdSolicitud });

		if (response.error) {
			Alert.alert(null, response.message || 'Error interno');
		} else if (response.cancelado) {
			await context.reloadReportes();
			navigation.goBack();
		} else {
			Alert.alert(null, 'No se pudo cancelar el reporte.');
		}

		setLoadingCancel(false);
	}

	return (
		<ImageBackground source={require('../../../../assets/background.jpg')} style={{ flex: 1, height: '100%' }}>
			<View style={Styles.backGround}>
				<Container>
					<ScrollView>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<View style={Styles.lista}>
								<FontAwesome5 name="map-marked-alt" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.NombreProyecto}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="home" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="map-marker-alt" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="tools" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="house-damage" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.NombreProblema}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="hashtag" size={20} color={Colores.DetalleText} />
								<Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
							</View>
							<View style={{ height: 16 }} />
							<View style={Styles.comentarios}>
								<Text style={{ fontSize: 14 }}>&nbsp;{info.Comentarios}</Text>
							</View>
							<View style={{ height: 16 }} />
							<View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
								<View style={Styles.imagenesContent}>
									{info.Img1 ? <ImagenButton index={1} imagen={{ uri: info.Img1 }} /> : <></>}
									{info.Img2 ? <ImagenButton index={2} imagen={{ uri: info.Img2 }} /> : <></>}
									{info.Img3 ? <ImagenButton index={3} imagen={{ uri: info.Img3 }} /> : <></>}
									{info.Vid1 ? <VideoButton index={4} video={{ uri: info.Vid1 }} /> : <></>}
								</View>
							</View>
							<View style={{ height: 16 }} />
							<View style={{ paddingHorizontal: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
								{info.IdEstado == 1 ?
									<Button onPress={_cancelarReporte.bind(this)} loading={loadingCancel}>
										<Text
											allowFontScaling={false}
											style={Styles.buttonText}>Cancelar Reporte</Text>
									</Button>
									:
									null
								}
							</View>
							<View style={{ height: 16 }} />
						</View>
					</ScrollView>
					<Modal
						visible={modalImagen}
						transparent={true}
						onBackButtonPress={() => setModalImagen(false)}>
						<View style={{ flex: 1, backgroundColor: '#000' }}>
							<View style={{ flex: 0.1, padding: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
								<TouchableOpacity onPress={() => setModalImagen(false)}>
									<FontAwesome5 name="times" size={35} color="#fff" />
								</TouchableOpacity>
							</View>
							<ImageZoom
								imageUrls={zoomImagen ? [{ url: zoomImagen.uri }] : []}
								renderIndicator={() => null}
								saveToLocalByLongPress={false} />
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
							{isPreloading &&
								<ActivityIndicator
									animating
									color={Colores.spinnerColor}
									size="large"
									style={{ position: "absolute", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
								/>
							}
							<Video
								style={{ flex: 1 }}
								source={playVideo}
								shouldPlay
								useNativeControls
								resizeMode="cover"
								onPlaybackStatusUpdate={status => status.didJustFinish ? setModalVideo(false) : status ? setIsPreloading(false) : null}
							/>
						</View>
					</Modal>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(DetalleReporte);
