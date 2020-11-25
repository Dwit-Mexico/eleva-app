import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Consumer } from '../../context';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';
import ListaViviendas from '../../components/lista-viviendas';
import BotonAccion from '../../components/boton/BotonAccion';

// Styles
import Styles from '../../styles/screens/PerfilStyle';
import StylesButtons from '../../styles/buttons';
import StylesTexts from '../../styles/text';
import { cos } from 'react-native-reanimated';

function _logOut(context) {
	if (context) {
		context.logout();
	}
}

const request = new Request();

const styleUserData = {
	position: 'absolute',
	backgroundColor: '#fff',
	width: '80%',
	top: -30,
	borderRadius: 5,
	padding: 5,
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5
}

function Perfil({ navigation, context }) {
	const [user, setUser] = useState({ Nombre: '' });
	const [unidades, setUnidades] = useState([]);

	async function getUsuarioInfo() {
		if (context) {
			const user = await request.post('/app/users/decode/token', { token: context.token });
			setUser(user);

			const response = await request.get('/app/unidades/get/unidades');

			if (response.data) {
				setUnidades(response.data);
			}
		}
	}

	useEffect(() => {
		getUsuarioInfo();
	}, []);

	return (
		<>
			<View style={{height: '25%'}}>
				<ImageBackground source={require('../../../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
				</ImageBackground>
			</View>
			<View style={{flex: 1, borderTopColor: '#B29360', borderTopWidth: 5, position: 'relative', alignItems: 'center'}}>
				<View style={styleUserData}>
					<Text style={{fontSize: 18, color: '#B29360', fontWeight: 'bold'}}>{user.Nombre}</Text>
					<View style={{height: 8}}/>
					<Text>{user.Direccion}</Text>
				</View>
				<View style={{flex: 1, width: '100%'}}>
					<Container>
						<View style={{height: 50}}/>
						<View style={{flex: 1, width: '100%'}}>
							<ListaViviendas lista = { unidades }/>
							<View style={Styles.logoutButtonView}>
								<View style={{marginBottom: 10, width: 200}}>
									<BotonAccion onPress={() => navigation.navigate('AgregarUsuario', { unidades })}>
										<Text style={StylesTexts.logoutButton}>Agregar usuario</Text>
									</BotonAccion>
								</View>
								<TouchableOpacity onPress={_logOut.bind(this, context)} style={StylesButtons.logoutButton}>
									<Text style={StylesTexts.logoutButton}>Cerrar sesión</Text>
								</TouchableOpacity>
								<View style={{height: 50}}/>
							</View>
						</View>
					</Container>
				</View>
			</View>
		</>
	);
}

export default Consumer(Perfil);