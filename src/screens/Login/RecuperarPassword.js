import React, { useRef, useState } from 'react';
import { Alert, View, ImageBackground, Text, TextInput, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import BotonAccion from '../../components/boton/BotonAccion';

//Styles
import LoginStyle from '../../styles/screens/LoginStyle';
import InputStyles from '../../styles/inputs';

const request = new Request();

function RecuperarPassword({navigation}) {
	const [loading, setLoading] = useState(false);
	const [correo, setCorreo] = useState('');

	let inputUsername = useRef();

	async function recuperarPassword() {
		setLoading(true);

		if (!correo) {
			Alert.alert(null, 'Proporcione un correo válido.');
			setLoading(false);
			return;
		}

		const data = {
			Email: correo
		}

		const response = await request.post('/app/users/recuperar/password', data);

		if (response.error) {
			Alert.alert(null, response.message || 'No se pudo enviar la información, intente nuevamente.');
		}

		if (response.sended) {
			Alert.alert(null, response.message || 'Correo enviado.');
			navigation.goBack();
		} else {
			Alert.alert(null, response.message || 'No se pudo enviar la información, intente nuevamente.');
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
							<View style={{height: 16}} />
							<TextInput
								placeholder="correo@dominio.com"
								placeholderTextColor="#eaeaea"
								style={InputStyles.LoginUsername}
								//onSubmitEditing={() => console.log('submit')}
								ref={(input) => inputUsername = input}
								returnKeyType="go"
								onChangeText={text => setCorreo(text)}/>
							<View style={{height: 16}} />
							<View style={{width: 300}}>
								<BotonAccion onPress={recuperarPassword.bind(this)} loading = {loading}>
									<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
								</BotonAccion>
							</View>
							<View style={{height: 24}}/>
							<View style={{width: 300}}>
								<BotonAccion onPress={() => navigation.goBack()}>
									<Text style={{fontSize: 18, color: 'white'}}>Regresar</Text>
								</BotonAccion>
							</View>
						</View>
					</Container>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

export default RecuperarPassword;
