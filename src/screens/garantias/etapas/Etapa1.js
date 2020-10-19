import React, { useState } from 'react';
import { StatusBar, ScrollView, Text, View, TextInput, Image, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';

// Componentes
import Container from '../../../components/container';
import SelectVivienda from '../../../components/select/SelectVivienda';
import SelectArea from '../../../components/select/SelectArea';
import SelectObjeto from '../../../components/select/SelectObjeto';
import SelectProblema from '../../../components/select/SelectProblema';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';

// Styles
import TextStyle from '../../../styles/text';

function Etapa1({navigation}) {

	const [imagen1, setImagen1] = useState(null);
	const [imagen2, setImagen2] = useState(null);
	const [imagen3, setImagen3] = useState(null);
	const [imagenIndex, setimagenIndex] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);
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
			navigation.navigate('Camara', { imagenIndex: index });
		}
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
			<ScrollView style = {{flex: 1}}>
				<Text style={TextStyle.EtapaTitulo}>Etapa 1</Text>

				<View style={{height: 8}}/>

				<SelectVivienda onChange = {(data) => console.log('SelectVivienda', data)}/>

				<View style={{height: 8}}/>

				<SelectArea onChange = {(data) => console.log('SelectArea', data)}/>

				<View style={{height: 8}}/>

				<SelectObjeto onChange = {(data) => console.log('SelectObjeto', data)}/>

				<View style={{height: 8}}/>

				<SelectProblema onChange = {(data) => console.log('SelectProblema', data)}/>

				<View style={{height: 8}}/>

				<TextInput
					placeholder="Escriba sus comentarios"
					style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
					multiline
					numberOfLines={6}
					maxLength={1500}/>

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
					<BotonEnviar onSubmit = {(submit) => console.log(submit)}/>
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
				</Modal>

			</ScrollView>
		</Container>
	);
}

export default Etapa1;