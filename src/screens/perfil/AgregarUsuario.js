import React, { useState, useEffect, useRef } from 'react';
import { Alert, ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Consumer } from '../../context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import SelectUnidad from '../../components/select-unidad/SelectUnidad';
import BotonAccion from '../../components/boton/BotonAccion';

// Styles
import StylesInputs from '../../styles/inputs';

const request = new Request();

function AgregarUsuario() {
	const [loading, setLoading] = useState(false);
	const [unidades, setUnidades] = useState([]);
	const [nombre, setNombre] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [correo, setCorreo] = useState('');
	const [telefono, setTelefono] = useState('');
	const [unidad, setUnidad] = useState(null);

	const route = useRoute();
	const navigation = useNavigation();

	let inputNombre = useRef();
	let inputApellidos = useRef();
	let inputCorreo = useRef();
	let inputTelefono = useRef();

	function validarCampo(campo, mensaje) {
		if (!campo) {
			Alert.alert('', mensaje);
			setLoading(false);
			return false;
		}
		return true;
	}

	function validarEmail(email) {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(reg.test(email) === false) {
			Alert.alert(null, "Se debe proporcinar un correo válido");
			setLoading(false);
			return false;
		} else {
			return true;
		}
	}

	async function agregarUsuario() {
		setLoading(true);

		if (!validarCampo(unidad, 'Se debe proporcinar una unidad válida.')) {
			return;
		}
		if (!validarCampo(nombre, 'se debe proporcinar un nombre válido.')) {
			return;
		}
		if (!validarCampo(apellidos, 'se debe proporcinar un apellido válido.')) {
			return;
		}
		if (!validarEmail(correo,)) {
			return;
		}

		const data = {
			Nombre: nombre,
			Apellidos: apellidos,
			Email: correo,
			Telefono: telefono,
			IdUnidad: unidad
		};

		const response = await request.post('/app/users/create', data);

		if (response.error) {
			Alert.alert(null, response.message || 'No se pudo agregar al usuario.');
		}

		if (response.created) {
			Alert.alert(null, 'Usuario agregado correctamente');
			navigation.goBack();
		} else {
			Alert.alert(null, response.message || 'No se pudo agregar al usuario.');
		}

		setLoading(false);
	}

	if (route.params) {
		useEffect(() => {
			let { unidades } = route.params;
			if (unidades) {
				unidades = unidades.map(unidad => { return {id: unidad.IdUnidad, name: unidad.Numero}})
				setUnidades(unidades);
			}
		}, [route.params]);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{flex: 1}}>
				<Container>
					<ScrollView>
						<View>
							<Text>Unidad</Text>
							<SelectUnidad
								unidades 		=	{unidades}
								onChange		=	{option => setUnidad(option)}/>
						</View>
						<View style={{height: 8}}/>
						<View>
							<Text>Nombre</Text>
							<TextInput
								value			=	{nombre}
								style			=	{StylesInputs.inputNormal}
								onChangeText	= 	{text => setNombre(text)}
								returnKeyType	=	"next"
								ref				= 	{ref => inputNombre = ref}
								onSubmitEditing	=	{() => inputApellidos.focus()}/>
						</View>
						<View>
							<Text>Apellidos</Text>
							<TextInput
								value			=	{apellidos}
								style			=	{StylesInputs.inputNormal}
								onChangeText	= 	{text => setApellidos(text)}
								returnKeyType	=	"next"
								ref				= 	{ref => inputApellidos = ref}
								onSubmitEditing	=	{() => inputCorreo.focus()}/>
						</View>
						<View>
							<Text>Correo (usuario)</Text>
							<TextInput
								value			=	{correo}
								style			=	{StylesInputs.inputNormal}
								onChangeText	= 	{text => setCorreo(text)}
								returnKeyType	=	"next"
								ref				= 	{ref => inputCorreo = ref}
								onSubmitEditing	=	{() => inputTelefono.focus()}/>
						</View>
						<View style={{height: 8}}/>
						<View>
							<Text>Teléfono</Text>
							<TextInput
								value			=	{telefono}
								style			=	{StylesInputs.inputNormal}
								onChangeText	= 	{text => setTelefono(text)}
								returnKeyType	=	"go"
								ref				= 	{ref => inputTelefono = ref}
								onSubmitEditing	=	{agregarUsuario.bind(this)}/>
						</View>
						<View style={{height: 8}}/>
						<BotonAccion onPress={agregarUsuario.bind(this)} loading = {loading}>
							<Text
								allowFontScaling={false}
								style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Agregar</Text>
						</BotonAccion>
					</ScrollView>
				</Container>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default Consumer(AgregarUsuario);