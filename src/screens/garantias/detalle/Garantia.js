import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View, Text, TextInput, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Consumer } from '../../../context';
import moment from 'moment-timezone';
import Request from '../../../core/api';

// Componentes
import Container from '../../../components/container';
import SelectFechas from '../../../components/select/SelectFechas';
import BotonAccion from '../../../components/boton/BotonAccion';

// Styles
import Styles from '../../../styles/screens/DetalleStyle';
import Colores from '../../../styles/colores';

const request = new Request();

const DetalleGarantia = ({ navigation, context }) => {
	const [info, setInfo] = useState({});
	const [fechas, setFechas] = useState([]);
	const [fecha, setFecha] = useState(null);
	const [comentarios, setComentarios] = useState('');
	const [loading, setLoading] = useState(false);
	const route = useRoute();

	if(route.params) {
		useEffect(()=> {
			const { data } = route.params;
			if (data) {
				setInfo(data);
			}
		}, [route.params])
	}

	useEffect(() => {
		console.log(info.IdSolicitud);
		let Fechas = [];
		if (moment(info.Fecha1).isAfter(moment())) {
			Fechas[0] = {id: 1, name: moment(info.Fecha1).format('DD/MM/YYYY HH:mm')}
		}
		if (moment(info.Fecha2).isAfter(moment())) {
			Fechas[1] = {id: 2, name: moment(info.Fecha2).format('DD/MM/YYYY HH:mm')}
		}
		if (moment(info.Fecha3).isAfter(moment())) {
			Fechas[2] = {id: 3, name: moment(info.Fecha3).format('DD/MM/YYYY HH:mm')}
		}
		setFechas(Fechas);
	}, [info])

	async function handleSubmit() {
		const FechaVisita = fecha == 1 ? moment(info.Fecha1).format()
								: fecha == 2 ? moment(info.Fecha2).format()
									: fecha == 3 ? moment(info.Fecha3).format()
										: null;

		if (!FechaVisita) {
			Alert.alert(null, 'Debe seleccionar una fecha.')
			return;
		}

		setLoading(true);

		const data = {
			FechaVisita,
			ComentariosVisita: comentarios,
			IdSolicitud: info.IdSolicitud
		}

		const response = await request.post('/app/garantias/update/fecha/visita', data);

		if (response.error) {
			Alert.alert(null, response.message || 'Error interno');
		}
		if (response.agendado) {
			await context.reloadReportes();
			navigation.goBack();
		}

		setLoading(false);
	}

	if (info.IdEstado == 3) {
		return (
			<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
				<View style={Styles.backGround}>
					<Container>
						<View style={{height: 8}}/>

						<Text style={{textAlign: 'center', color: Colores.DetalleText, fontSize: 18, fontWeight: 'bold'}}>No Aplica Garantía</Text>

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

	if (info.IdEstado == 5) {
		return (
			<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
				<View style={Styles.backGround}>
					<Container>
						<View style={{height: 8}}/>

						<Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold', color: Colores.DetalleText}}>Programada</Text>

						<View style={{height: 16}}/>

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
						<View style={{height: 24}}/>
						<Text style={{textAlign: 'center', fontSize: 32, padding: 5, color: Colores.DetalleText}}>
							Fecha Visita: {moment(info.FechaVisita).format('DD/MM/YYYY HH:mm')}
						</Text>

						<View style={{height: 32}}/>
					</Container>
				</View>
			</ImageBackground>
		)
	}

	return (
		<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
			<View style={Styles.backGround}>
				<Container>
					<ScrollView style = {{flex: 1}}>

						<View style={{height: 8}}/>

						<Text style={{textAlign: 'center', color: Colores.DetalleText}}>Seleccione la fecha para la reparación</Text>

						<View style={{height: 8}}/>

						<SelectFechas fechas = {fechas} onChange = {(data) => setFecha(data)}/>

						<View style={{height: 8}}/>

						<TextInput
							onChangeText={(text) => setComentarios(text)}
							placeholder="Escriba sus comentarios"
							style={Styles.comentarios}
							multiline
							numberOfLines={6}
							maxLength={1500}/>

						<View style={{height: 32}}/>

						<View style={{alignItems: 'center'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', width: 200}}>
								<BotonAccion onPress = {handleSubmit.bind(this)} loading = {loading}>
									<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
								</BotonAccion>
							</View>
						</View>

					</ScrollView>
				</Container>
			</View>
		</ImageBackground>
	)
}

export default Consumer(DetalleGarantia);
