import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View, Text, TextInput, Button } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Consumer } from '../../../context';
import Request from '../../../core/api';

// Componentes
import Container from '../../../components/container';
import BotonAccion from '../../../components/boton/BotonAccion';

// Styles

const request = new Request();

const DetalleValoracion = ({ context }) => {
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
		<Container>
			<ScrollView style={{flex: 1}}>
				<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>¿Quedó satisfecho con la reparación?</Text>

				<View style={{height: 16}}/>

				<Text style={{textAlign: 'justify', color: '#000'}}>
					SI la respuesta es SI, por favor valore nuestro servicio de atención al cliente.
					En caso de que No, por favor indíquenos el motivo y agendaremos otra cita.
				</Text>

				<View style={{height: 16}}/>

				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<View style={{width: 100, padding: 5}}>
						<Button title = "Si" color = {respuesta == true? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta(true)}/>
					</View>
					<View style={{width: 100, padding: 5}}>
						<Button title = "No" color = {respuesta == false? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta(false)}/>
					</View>
				</View>

				<View style={{height: 16}}/>

				<TextInput
					value 			=	{comentario}
					placeholder		=	"Escriba sus comentarios"
					style			=	{{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
					multiline
					numberOfLines	=	{6}
					maxLength		=	{1500}
					onChangeText={(text) => setComentario(text)}/>

				<View style={{height: 32}}/>

				<AirbnbRating
					reviewSize={18}
					count={5}
					reviews={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
					defaultRating={5}
					showRating={true}
					size={30}
					onFinishRating={ratingCompleted}/>

				<View style={{height: 32}}/>

				{!info.Valoracion ?
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<BotonAccion onPress = {handleSubmit.bind(this)} loading = {loading}>
							<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
						</BotonAccion>
					</View>
					: 
					null
				}

			</ScrollView>
		</Container>
	)
}

export default Consumer(DetalleValoracion);