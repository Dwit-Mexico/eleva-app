import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View, Text, TextInput, Button, ImageBackground } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Consumer } from '../../../context';
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

	function ratingCompleted(rating) {
		setValoracion(rating);
	}

	async function handleSubmit() {
		setLoading(true);

		if (respuesta == null) {
			setLoading(false);
			Alert.alert(null, 'Por favor elija una respuesta válida.')
			return;
		}

		const data = {
			IdSolicitud: info.IdSolicitud,
			Reparado: respuesta,
			ComentarioReparacion: comentario,
			Valoracion: valoracion
		}

		const response = await request.post('/app/garantias/update/valoracion', data);

		if (response.error) {
			Alert.alert(null, response.message || 'No se pudo enviar la valoración.');
		}

		if (response.guardado) {
			await context.reloadReportes();
			Alert.alert(null, 'Gracias por su valoración.');
			navigation.goBack();
		}

		setLoading(false);
	}

	return (
		<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
			<View style={Styles.backGround}>
				<Container>
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
					<View style={{height: 32}}/>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(Historico);