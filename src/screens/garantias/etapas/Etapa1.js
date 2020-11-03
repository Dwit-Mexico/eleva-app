import React, { useState } from 'react';
import { StatusBar, ScrollView, Text, View, TextInput, Image, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Consumer } from '../../../context';
import ImageZoom from 'react-native-image-zoom-viewer';
import * as ImageManipulator from 'expo-image-manipulator';

// Componentes
import Container from '../../../components/container';
import SelectProblema from '../../../components/select/SelectProblema';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';
import Wizard from '../../../components/wizard';

//Pages
import Vivienda from './formulario/vivienda';
import Area from './formulario/area';
import Equipo from './formulario/equipo';
import Problema from './formulario/problema';

// Styles
import TextStyle from '../../../styles/text';

// API
import Request from '../../../core/api';
const request = new Request();

const formValues = { unidad: null, area: null, equipo: null, problema: null, comentarios: null };

function Etapa1({navigation, esDetalle, context}) {
	const [form, setForm] = useState(formValues);
	const [loading, setLoading] = useState(false);
	const [imagen1, setImagen1] = useState(null);
	const [imagen2, setImagen2] = useState(null);
	const [imagen3, setImagen3] = useState(null);
	const [imagenIndex, setimagenIndex] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);
	const [paso, setPaso] = useState(1);
	const route = useRoute();

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

	async function _compressImage(imagen, name) {
		const manipResult = await ImageManipulator.manipulateAsync (
			imagen.uri,
			[],
			{ compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: false }
		);

		return {
			uri: manipResult.uri,
			name: `${name}.jpg`,
			type: `image/jpg`,
		}
	}

	async function _handleSubmit() {
		setLoading(true);
		const data = form;
		let newImagen1, newImagen2, newImagen3;
		if(imagen1) {
			newImagen1 = await _compressImage(imagen1, 'imagen1');
		}

		if(imagen2) {
			newImagen2 = await _compressImage(imagen2, 'imagen2');
		}

		if(imagen3) {
			newImagen3 = await _compressImage(imagen3, 'imagen3');
		}

		const response = await request.postFile('/app/garantias/crear', [newImagen1, newImagen2, newImagen3], data);
		if (response.error) {
			alert(response.message);
		}
		setLoading(false);
	}

	const ImagenButton = ({ navigation, index, imagen }) => {
		const EmptyImage = require('../../../../assets/picture_icon.png');

		return (
			<TouchableOpacity onPress={_openCamara.bind(this, navigation, index, imagen, _borrarImagen)}>
				<Image source={imagen || EmptyImage} style={{width: 100, height: 80}}/>
			</TouchableOpacity>
		)
	}

	useFocusEffect(() => {

		StatusBar.setBarStyle('dark-content');

		if (route.params) {
			const { imagen, imagenIndex } = route.params;
			switch(imagenIndex) {
				case 1: 
					setImagen1(imagen);
					break;
				case 2: 
					setImagen2(imagen);
					break;
				case 3: 
					setImagen3(imagen);
					break;
			}
		}
	});

	return (
		<Container>
			<View style = {{flex: 1, height: '100%'}}>
				<Text style={TextStyle.EtapaTitulo}>Etapa 1</Text>

				<View style={{height: 8}}/>

				<Wizard
					steps = {[
					<Vivienda />,
					<Area />,
					<Equipo />,
					<Problema />
				]}/>
				{/*

				<View style={{height: 8}}/>

				<TextInput
					placeholder="Escriba sus comentarios"
					style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
					multiline
					numberOfLines={6}
					maxLength={1500}
					onChangeText = {(text) => setForm({...form, comentarios: text})}/>

				<View style={{height: 16}}/>

				<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
						<ImagenButton index = {1} imagen = {imagen1} navigation = {navigation}/>
						<ImagenButton index = {2} imagen = {imagen2} navigation = {navigation}/>
						<ImagenButton index = {3} imagen = {imagen3} navigation = {navigation}/>
					</View>
				</View>

				<View style={{height: 32}}/>

				<View style={{flexDirection: 'row', justifyContent: 'center'}}>
					<BotonEnviar onSubmit = {_handleSubmit.bind(this)} loading = {loading}/>
				</View>

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
				</Modal>*/}

			</View>
		</Container>
	);
}

export default Consumer(Etapa1);