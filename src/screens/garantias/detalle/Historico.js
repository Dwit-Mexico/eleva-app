import React, { useState, useEffect } from 'react';
import {
	Alert,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Image,
	Button,
	Modal } from 'react-native';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import Request from '../../../core/api';

// Componentes
import Container from '../../../components/container';
import BotonAccion from '../../../components/boton/BotonAccion';

// Styles
import Styles from '../../../styles/screens/DetalleStyle';
import Colores from '../../../styles/colores';

const request = new Request();

const Historico = ({ context }) => {
	const [info, setInfo] = useState({});
	const [respuesta, setRespuesta] = useState(null);
	const [comentario, setComentario] = useState('');
	const [valoracion, setValoracion] = useState(5);
	const [loading, setLoading] = useState(false);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);

	const route = useRoute();
	const navigation = useNavigation();

	useEffect(() => {
		const { data } = route.params;
		if (data) {
			setInfo(data);
			setRespuesta(data.Reparado || null);
			setComentario(data.ComentarioReparacion || '');
			setValoracion(data.Valoracion || 5);
		}
	}, [route.params])

	const ImagenButton = ({ navigation, index, imagen }) => {
		const EmptyImage = require('../../../../assets/picture.jpg');

		return (
			<View style={{width: 100, height: 80, padding: 5}}>
				<TouchableOpacity onPress={() => _openCamara(navigation, index, imagen)}>
					<Image source={imagen || EmptyImage} style={{width: '100%', height: '100%'}} resizeMode='cover'/>
				</TouchableOpacity>
			</View>
		)
	}

	function _openCamara(navigation, index, imagen) {
		if (imagen) {
			setModalImagen(true);
			setZoomImagen(imagen);
			return;
		}
	}

	return (
		<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
			<View style={Styles.backGround}>
				<Container>
					<ScrollView>
						<View style={{height: 8}}/>

						<Text style={{textAlign: 'center', color: Colores.DetalleText, fontSize: 18, fontWeight: 'bold'}}>
							{info.Estado}
						</Text>

						<Text style={{fontSize: 16, padding: 5, color: Colores.DetalleText}}>
							Unidad: {info.Numero}
						</Text>
						<Text style={{fontSize: 16, padding: 5, color: Colores.DetalleText}}>
							Area: {info.NombreArea}
						</Text>
						<Text style={{fontSize: 16, padding: 5, color: Colores.DetalleText}}>
							Equipo: {info.NombreEquipo}
						</Text>
						<Text style={{fontSize: 16, padding: 5, color: Colores.DetalleText}}>
							Problema: {info.NombreProblema}
						</Text>

						<View style={{height: 16}}/>

						<View style={Styles.comentarios}>
							<Text style={{fontSize: 16, color: '#000'}}>
								{info.ComentariosAplica}
							</Text>
						</View>

						<View style={{height: 16}}/>

						<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
							<View style={Styles.imagenesContent}>
								<ImagenButton index = {1} imagen = {info.ImgEvidencia1? {uri: info.ImgEvidencia1} : null} navigation = {navigation}/>
								<ImagenButton index = {2} imagen = {info.ImgEvidencia2? {uri: info.ImgEvidencia2} : null} navigation = {navigation}/>
								<ImagenButton index = {3} imagen = {info.ImgEvidencia3? {uri: info.ImgEvidencia3} : null} navigation = {navigation}/>
							</View>
						</View>

						<View style={{height: 32}}/>

					</ScrollView>
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
						</View>
					</Modal>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(Historico);