import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import Request from '../../../core/api';

// Componentes
import Container from '../../../components/container';
import Button from '../../../components/boton/BotonAccion';

const request = new Request();

const styles = StyleSheet.create({
	lista: {
		margin: 5,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%'
	},
	listaText: {
		fontSize: 20
	},
	button: {
		backgroundColor: '#B29360',
		color: '#ffffff',
		padding: 10,
		width: 150,
		textAlign: 'center',
		borderRadius: 5,
		marginHorizontal: 10
	},
	buttonText: {
		fontSize: 19,
		textAlign: 'center',
		color: '#fff'
	},
	comentarios: {
		width: '100%',
		borderRadius: 8,
		borderColor: '#000',
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 17,
		textAlignVertical: "top",
		fontSize: 14,
		minHeight: 100
	}
})

const DetalleReporte = ({ navigation, context }) => {
	const [info, setInfo] = useState({
		Numero: '',
		NombreArea: '',
		NombreEquipo: '',
		NombreProblema: '',
		Comentarios: '',
		IdEstado: 0
	});
	const [imagenIndex, setimagenIndex] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);
	const [loadingCancel, setLoadingCancel] = useState(false);
	const route = useRoute();

	useFocusEffect(() => {
		const params = route.params;

		if (params.data) {
			const info = params.data;
			setInfo(info || {});
		}
	});

	function _openCamara(navigation, index, imagen) {
		if (imagen) {
			setModalImagen(true);
			setZoomImagen(imagen);
			setimagenIndex(index);
			return;
		}
		/* if (navigation) {
			navigation.navigate('Camara', { imagenIndex: index, esDetalle });
		}*/
	}

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

	const ImagenButton = ({ navigation, index, imagen }) => {
		const EmptyImage = require('../../../../assets/picture_icon.png');

		//console.log('Imagen', index, imagen);
		return (
			<View style={{width: 100, height: 80, padding: 5}}>
				<TouchableOpacity onPress={_openCamara.bind(this, navigation, index, imagen, _borrarImagen)}>
					<Image source={imagen || EmptyImage} style={{width: '100%', height: '100%'}} resizeMode='cover'/>
				</TouchableOpacity>
			</View>
		)
	}

	async function _cancelarReporte() {
		setLoadingCancel(true);

		const response = await request.post('/app/garantias/cancelar', { IdSolicitud: info.IdSolicitud });

		if (response.error) {
			alert(response.message || 'Error interno');
		} else if(response.cancelado) {
			await context.reloadReportes();
			navigation.goBack();
		} else {
			alert('No se pudo cancelar el reporte.');
		}

		setLoadingCancel(false);
	}

	return (
		<Container>
			<ScrollView>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<View style={styles.lista}>
						<FontAwesome5 name="map-marked-alt" size={20}/>
						<Text style={styles.listaText}>&nbsp;{info.NombreProyecto}</Text>
					</View>
					<View style={styles.lista}>
						<FontAwesome5 name="home" size={20}/>
						<Text style={styles.listaText}>&nbsp;{info.Numero}</Text>
					</View>
					<View style={styles.lista}>
						<FontAwesome5 name="map-marker-alt" size={20}/>
						<Text style={styles.listaText}>&nbsp;{info.NombreArea}</Text>
					</View>
					<View style={styles.lista}>
						<FontAwesome5 name="tools" size={20}/>
						<Text style={styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
					</View>
					<View style={styles.lista}>
						<FontAwesome5 name="house-damage" size={20}/>
						<Text style={styles.listaText}>&nbsp;{info.NombreProblema}</Text>
					</View>
					<View style={{height: 16}}/>
					<View style={styles.comentarios}>
						<Text style={{fontSize: 14}}>&nbsp;{info.Comentarios}</Text>
					</View>
					<View style={{height: 16}}/>
					<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
							<ImagenButton index = {1} imagen = {info.Img1? {uri: info.Img1} : null} navigation = {navigation}/>
							<ImagenButton index = {2} imagen = {info.Img2? {uri: info.Img2} : null} navigation = {navigation}/>
							<ImagenButton index = {3} imagen = {info.Img3? {uri: info.Img3} : null} navigation = {navigation}/>
						</View>
					</View>
					<View style={{height: 16}}/>
					<View style={{paddingHorizontal: 30, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
						{info.IdEstado == 1?
							<Button onPress={_cancelarReporte.bind(this)} loading = {loadingCancel}>
								<Text style={styles.buttonText}>Cancelar</Text>
							</Button>
							:
							null
						}
					</View>
					<View style={{height: 16}}/>
				</View>
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
					{/*<View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
						<TouchableOpacity onPress={() => _borrarImagen()}>
							<FontAwesome5 name="edit" size={35} color="#fff" />
						</TouchableOpacity>
					</View>*/}
				</View>
			</Modal>
		</Container>
	)
}

export default Consumer(DetalleReporte);
