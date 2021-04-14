import React, { useState, useEffect } from 'react';
import {
	Alert,
	ScrollView,
	View,
	Text,
	TextInput,
	ImageBackground,
	TouchableOpacity,
	Image,
	Button,
	Modal
} from 'react-native';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
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
	const [respuesta, setRespuesta] = useState(null);
	const [modalImagen, setModalImagen] = useState(false);
	const [zoomImagen, setZoomImagen] = useState(null);
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
						<ScrollView>
							<View style={{height: 8}}/>

							<Text style={{textAlign: 'center', color: Colores.DetalleText, fontSize: 18, fontWeight: 'bold'}}>No Aplica Garantía</Text>

							<View style={Styles.lista}>
								<FontAwesome5 name="map-marked-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProyecto}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="home" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="map-marker-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="tools" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="house-damage" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProblema}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="hashtag" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
							</View>

							<View style={{height: 16}}/>

							<View style={Styles.comentarios}>
								<Text style={{fontSize: 16, color: '#000'}}>
									{info.ComentariosAplica}
								</Text>
							</View>
							<View style={{height: 32}}/>
						</ScrollView>
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
						<ScrollView>
							<View style={{height: 8}}/>

							<Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold', color: Colores.DetalleText}}>Programada</Text>

							<View style={{height: 16}}/>

							<View style={Styles.lista}>
								<FontAwesome5 name="map-marked-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProyecto}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="home" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="map-marker-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="tools" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="house-damage" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProblema}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="hashtag" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
							</View>

							<View style={{height: 24}}/>
							<Text
								allowFontScaling={false}
								style={{textAlign: 'center', fontSize: 25, padding: 5, color: Colores.DetalleText}}>
									Fecha Visita: { info.FechaVisita ? moment(info.FechaVisita).format('DD/MM/YYYY HH:mm') : 'Sin fecha asignada'}
							</Text>

							<View style={{height: 32}}/>
						</ScrollView>
					</Container>
				</View>
			</ImageBackground>
		)
	}

	const ImagenButton = ({ navigation, index, imagen }) => {
		const EmptyImage = require('../../../../assets/picture_icon.png');

		//console.log('Imagen', index, imagen);
		return (
			<View style={{width: 100, height: 80, padding: 5}}>
				<TouchableOpacity onPress={() =>  _openCamara(navigation, index, imagen)}>
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

	async function aceptarRealizado() {

		if (respuesta == null) {
			Alert.alert(null, 'Debe seleccionar una respuesta.')
			return;
		}

		setLoading(true);

		const data = {
			Respuesta: respuesta,
			IdSolicitud: info.IdSolicitud
		}

		const response = await request.post('/app/garantias/update/realizado', data);

		if (response.error) {
			Alert.alert(null, response.message || 'Error interno');
		}
		if (response.actualizado) {
			await context.reloadReportes();
			navigation.goBack();
		}

		setLoading(false);
	}

	if (info.IdEstado == 7) {
		return (
			<ImageBackground source={require('../../../../assets/background.jpg')} style={{flex: 1, height: '100%'}}>
				<View style={Styles.backGround}>
					<Container>
						<ScrollView>
							<View style={{height: 8}}/>

							<Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold', color: Colores.DetalleText}}>
								Realizada
							</Text>

							<View style={{height: 16}}/>

							<View style={Styles.lista}>
								<FontAwesome5 name="map-marked-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProyecto}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="home" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="map-marker-alt" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="tools" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="house-damage" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NombreProblema}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="hashtag" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
							</View>
							<View style={Styles.lista}>
								<FontAwesome5 name="calendar" size={20} color = {Colores.DetalleText}/>
								<Text style={Styles.listaText}>&nbsp;{ info.FechaVisita ? moment(info.FechaVisita).format('DD/MM/YYYY HH:mm') : 'Sin fecha asignada'}</Text>
							</View>

							<View style={{height: 16}}/>

							<View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
								{console.log(info.ImgEvidencia1)}
								<View style={Styles.imagenesContent}>
									<ImagenButton index = {1} imagen = {info.ImgEvidencia1? {uri: info.ImgEvidencia1} : null} navigation = {navigation}/>
									<ImagenButton index = {2} imagen = {info.ImgEvidencia2? {uri: info.ImgEvidencia2} : null} navigation = {navigation}/>
									<ImagenButton index = {3} imagen = {info.ImgEvidencia3? {uri: info.ImgEvidencia3} : null} navigation = {navigation}/>
								</View>
							</View>

							<View style={{height: 16}}/>

							<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{textAlign: 'justify', color: Colores.DetalleText}}>
									¿El trabajo fue realizado?
								</Text>
							</View>

							<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								<View style={{width: 100, padding: 5}}>
									<Button title = "Si" color = {respuesta == true? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta(true)}/>
								</View>
								<View style={{width: 100, padding: 5}}>
									<Button title = "No" color = {respuesta == false? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta(false)}/>
								</View>
							</View>

							<View style={{height: 16}}/>

							<View style={{flexDirection: 'row', justifyContent: 'center'}}>
								<BotonAccion onPress = {aceptarRealizado.bind(this)} loading = {loading}>
									<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
								</BotonAccion>
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
