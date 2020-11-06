import React, { useState, useEffect } from 'react';
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
import Unidad from './formulario/unidad';
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

function Etapa1({navigation, esDetalle, context}) {
	const [unidad, setUnidad] = useState(null);
	const [area, setArea] = useState(null);
	const [equipo, setEquipo] = useState(null);
	const [problema, setProblema] = useState(null);
	const [comentario, setComentario] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imagen1, setImagen1] = useState(null);
	const [imagen2, setImagen2] = useState(null);
	const [imagen3, setImagen3] = useState(null);
	const [paso, setPaso] = useState(1);
	const route = useRoute();
	const { params } = route;

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

	if (params) {
		useEffect(() => {
			if (context) {
				setUnidad(context.unidad);
				setArea(context.area);
				setEquipo(context.equipo);
				setProblema(context.problema);
				setComentario(context.comentario);
				setImagen1(context.imagen1);
				setImagen2(context.imagen2);
				setImagen3(context.imagen3);
			}
			const { imagen, imagenIndex } = params;
			switch(imagenIndex) {
				case 1:
					context.setImagen1(imagen);
					setImagen1(imagen);
					break;
				case 2:
					context.setImagen2(imagen);
					setImagen2(imagen);
					break;
				case 3:
					context.setImagen3(imagen);
					setImagen3(imagen);
					break;
			}
		}, [params])
	}

	useEffect(() => {
		async function setedUnidad() {
			if (context && unidad) {
				await context.setUnidad(unidad);
			}
		}

		setedUnidad();

	}, [unidad]);

	useEffect(() => {
		async function setedArea() {
			if (context && area) {
				await context.setArea(area);
			}
		}

		setedArea();

	}, [area]);

	useEffect(() => {
		async function setedEquipo() {
			if (context && equipo) {
				await context.setEquipo(equipo);
			}
		}

		setedEquipo();

	}, [equipo]);

	useEffect(() => {
		async function setedProblema() {
			if (context && problema) {
				await context.setProblema(problema);
			}
		}

		setedProblema();

	}, [problema]);

	useEffect(() => {
		async function setedComentario() {
			if (context && comentario) {
				await context.setComentario(comentario);
			}
		}

		setedComentario();

	}, [comentario]);

	return (
		<Container>
			<View style = {{flex: 1, height: '100%'}}>
				<Text style={TextStyle.EtapaTitulo}>Etapa 1</Text>

				<View style={{height: 8}}/>

				<Wizard
					steps = {[
					<Unidad
						unidad 			= {unidad}
						setUnidad 		= {setUnidad}/>,
					<Area
						area 			= {area}
						setArea 		= {setArea}/>,
					<Equipo
						equipo 			= {equipo}
						setEquipo 		= {setEquipo}/>,
					<Problema
						problema 		= {problema}
						setProblema 	= {setProblema}/>,
					<Comentario
						comentario 		= {comentario}
						setComentario 	= {setComentario}/>,
					<Fotos
						navigation 	= {navigation}
						esDetalle 	= {esDetalle}
						imagenes 	= {{imagen1, imagen2, imagen3}}/>
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