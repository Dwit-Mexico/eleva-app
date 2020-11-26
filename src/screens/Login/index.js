import React, { Component } from 'react';
import {
	Alert,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	StatusBar,
	ImageBackground
} from 'react-native';
import { Consumer } from '../../context';

//Components
import Container from '../../components/container';
import Boton from '../../components/boton/BotonAccion';

//Styles
import LoginStyle from '../../styles/screens/LoginStyle';
import TextStyle from '../../styles/text';
import InputStyles from '../../styles/inputs';
import ButtonStyles from '../../styles/buttons';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usuario: '',
			password: '',
			loading: false
		}
		this.inputUsername = null;
		this.inputPassword = null;
	}

	async _handleSubmit() {
		this.setState({loading: true});
		const { usuario, password } = this.state;
		if (!usuario) {
			Alert.alert(null, 'Debe proporcionar un usuario válido.');
			this.setState({loading: false});
			return;
		}
		if (!password) {
			Alert.alert(null, 'Debe proporcionar una contraseña válida.');
			this.setState({loading: false});
			return;
		}
		const { context } = this.props;
		if (context) {
			const validar = await context.validar(usuario, password);
			if (validar.activar) {
				this.props.navigation.navigate('ActualizarPassword', { username: usuario, IdPersona: validar.IdPersona });
				return;
			}
			await context.login(usuario, password)
		}
		this.setState({loading: false});
	}

	render () {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
					<View style={LoginStyle.backGround}>
						<Container>
							<View style={LoginStyle.loginView}>
								<Image source={require('../../../assets/logo.png')} style={{width: 300, height: 300}}/>
								<Text style={TextStyle.LoginTitle}>
									DESARROLLOS URBANÍSTICOS
								</Text>
								<View style={{height: 16}} />
								<TextInput
									placeholder="CORREO ELECTRONICO"
									placeholderTextColor="#eaeaea"
									style={InputStyles.LoginUsername}
									onSubmitEditing={() => this.inputPassword.focus()}
									ref={(input) => this.inputUsername = input}
									returnKeyType="next"
									onChangeText={text => this.setState({usuario: text})}/>
								<View style={{height: 8}} />
								<TextInput
									placeholder="CONTRASEÑA"
									placeholderTextColor="#eaeaea"
									style={InputStyles.LoginPassword}
									secureTextEntry={true}
									ref={(input) => this.inputPassword = input}
									returnKeyType="go"
									onSubmitEditing={this._handleSubmit.bind(this)}
									onChangeText={text => this.setState({password: text})}/>
								<View style={{height: 32}} />
								<View style={{width: 300}}>
									<Boton onPress = {this._handleSubmit.bind(this)} loading = {this.state.loading}>
										<Text style={TextStyle.loginButton}>Iniciar</Text>
									</Boton>
								</View>
								<View style={{height: 16}} />
								<View style={{width: 300}}>
									<TouchableOpacity onPress={() => this.props.navigation.navigate('RcuperarPassword', { usuario: this.state.usuario })}>
										<Text style={{fontSize: 12, color: 'white', textAlign: 'center'}}>Olvidaste tu contraseña</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Container>
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		);
	}
}

export default Consumer(LoginScreen);