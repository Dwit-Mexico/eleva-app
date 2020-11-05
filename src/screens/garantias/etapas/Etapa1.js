import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';
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
import Comentario from './formulario/comentario';
import Fotos from './formulario/fotos';

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
	const [paso, setPaso] = useState(1);
	const route = useRoute();

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

	useFocusEffect(() => {
		StatusBar.setBarStyle('dark-content');
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
					<Problema />,
					<Comentario />,
					<Fotos navigation = {navigation} esDetalle = {esDetalle}/>
				]}/>
				{/*

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
				*/}

			</View>
		</Container>
	);
}

export default Consumer(Etapa1);