import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';

// Componentes
import Container from '../../../components/container';

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

const DetalleReporte = ({ navigation }) => {
	const [info, setInfo] = useState({Numero: '', NombreArea: '', NombreEquipo: '', NombreProblema: '', Comentarios: '' });
	const route = useRoute();

	useFocusEffect(() => {
		const params = route.params;
		console.log(params.data);
		if (params.data) {
			const info = params.data;
			setInfo(info || {});
		}
	});

	function _openCamara(navigation, index, imagen) {
		if (imagen) {
			console.log(imagen)
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

		return (
			<View style={{width: 100, height: 80, padding: 10}}>
				<TouchableOpacity onPress={_openCamara.bind(this, navigation, index, imagen, _borrarImagen)}>
					<Image source={imagen || EmptyImage} style={{width: '100%', height: '100%'}} resizeMode='cover'/>
				</TouchableOpacity>
			</View>
		)
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
					<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
						<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
							<ImagenButton index = {1} imagen = {info.Img1? {uri: info.Img1} : null} navigation = {navigation}/>
							<ImagenButton index = {2} imagen = {info.Img2? {uri: info.Img2} : null} navigation = {navigation}/>
							<ImagenButton index = {3} imagen = {info.Img3? {uri: info.Img3} : null} navigation = {navigation}/>
						</View>
					</View>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>
					<View style={{height: 16}}/>
				</View>
			</ScrollView>
		</Container>
	)
}

export default Consumer(DetalleReporte);
