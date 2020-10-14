import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	StatusBar
} from 'react-native';
import { Consumer } from '../../context';

//Components
import Container from '../../components/container';

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
			password: ''
		}
		this.inputUsername = null;
		this.inputPassword = null;
	}

	async _handleSubmit() {
		const { usuario, password } = this.state;
		if (!usuario) {
			alert('Debe proporcionar un usuario válido.')
			return;
		}
		if (!password) {
			alert('Debe proporcionar una contraseña válida.')
			return;
		}
		const { context } = this.props;
		if (context) {
			await context.login(usuario, password);
		}
	}

	render () {
		StatusBar.setBarStyle('light-content');
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={LoginStyle.backGround}>
					<Container>
						<View style={LoginStyle.loginView}>
							<Image source={require('../../../assets/logo.png')} style={{width: 300, height: 300}}/>
							<Text style={TextStyle.LoginTitle}>
								Desarrollos Urbanísticos
							</Text>
							<View style={{height: 16}} />
							<TextInput
								placeholder="correo@dominio.com"
								placeholderTextColor="#757575"
								style={InputStyles.LoginUsername}
								onSubmitEditing={() => this.inputPassword.focus()}
								ref={(input) => this.inputUsername = input}
								returnKeyType="next"
								onChangeText={text => this.setState({usuario: text})}/>
							<View style={{height: 8}} />
							<TextInput
								placeholder="Contraseña"
								placeholderTextColor="#757575"
								style={InputStyles.LoginPassword}
								secureTextEntry={true}
								ref={(input) => this.inputPassword = input}
								returnKeyType="go"
								onSubmitEditing={this._handleSubmit.bind(this)}
								onChangeText={text => this.setState({password: text})}/>
							<View style={{height: 32}} />
							<TouchableOpacity style={ButtonStyles.loginButton} onPress={this._handleSubmit.bind(this)}>
								<Text style={TextStyle.loginButton}>Iniciar</Text>
							</TouchableOpacity>
						</View>
					</Container>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default Consumer(LoginScreen);