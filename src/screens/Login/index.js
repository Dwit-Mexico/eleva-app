import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image
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

		}
		this.inputUsername = null;
		this.inputPassword = null;
	}

	_handleSubmit() {
		const { context } = this.props;
		if (context) {
			context.login();
		}
	}

	render () {
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
								style={InputStyles.LoginUsername}
								onSubmitEditing={() => this.inputPassword.focus()}
								ref={(input) => this.inputUsername = input}
								returnKeyType="next"/>
							<View style={{height: 8}} />
							<TextInput
								style={InputStyles.LoginPassword}
								secureTextEntry={true}
								ref={(input) => this.inputPassword = input}
								returnKeyType="go"
								onSubmitEditing={this._handleSubmit.bind(this)}/>
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