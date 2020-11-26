import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Consumer } from '../../context';
import { useRoute } from '@react-navigation/native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import BotonAccion from '../../components/boton/BotonAccion';

//Styles
import LoginStyle from '../../styles/screens/LoginStyle';
import InputStyles from '../../styles/inputs';

const request = new Request();

function ActualizarPassword({ context }) {
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [usuario, setUsuario] = useState('');
	const [id, setIdPersona] = useState(null);
	const [repassword, setRePassword] = useState('');

	const route = useRoute();

	let inputNewPassword = useRef();
	let inputRetypePassword = useRef();

	useEffect(() => {
		const { username, IdPersona } = route.params;
		if (username) {
			setUsuario(username);
		}
		if (IdPersona) {
			setIdPersona(IdPersona);
		}
	}, [route.params])

	function validarPassword() {
		if (!password) {
			alert('Proporcione una contraseña válida');
			return false;
		}
		if (password !== repassword) {
			alert('Las contraseñas no coinciden.');
			return false;
		}
		return true;
	}

	async function actualizarPassword() {
		setLoading(true);

		if (!validarPassword()) {
			setLoading(false);
			return;
		}

		const data = {
			IdPersona: id,
			Password: password
		}

		const response = await request.post('/app/users/activar/cuenta', data);

		if (response.error) {
			alert(response.message || 'No se pudo actualizar la contraseña.');
		}

		if (response.updated) {
			if (context) {
				await context.login(usuario, password);
			}
		}

		setLoading(false);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1, resizeMode: "contain", justifyContent: "center"}}>
				<View style={LoginStyle.backGround}>
					<Container>
						<View style={LoginStyle.loginView}>
							<Image source={require('../../../assets/logo.png')} style={{width: 300, height: 300}}/>
							<View>
								<Text style={{fontSize: 18, color: 'white'}}>Por favor proporciona tu nueva contraseña</Text>
							</View>
							<View style={{height: 32}} />
							<TextInput
								placeholder="CONTRASEÑA NUEVA"
								placeholderTextColor="#eaeaea"
								style={InputStyles.LoginUsername}
								onSubmitEditing={() => console.log('submit')}
								ref={(input) => inputNewPassword = input}
								returnKeyType="next"
								onChangeText={text => setPassword(text)}
								secureTextEntry={true}/>
							<View style={{height: 16}} />
							<TextInput
								placeholder="REPETIR CONTRASEÑA"
								placeholderTextColor="#eaeaea"
								style={InputStyles.LoginUsername}
								onSubmitEditing={() => console.log('submit')}
								ref={(input) => inputRetypePassword = input}
								returnKeyType="go"
								onChangeText={text => setRePassword(text)}
								secureTextEntry={true}/>
							<View style={{height: 32}} />
							<View style={{width: 300}}>
								<BotonAccion onPress={actualizarPassword.bind(this)} loading={loading}>
									<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
								</BotonAccion>
							</View>
							<View style={{height: 24}}/>
						</View>
					</Container>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

export default Consumer(ActualizarPassword);