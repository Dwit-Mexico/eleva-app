import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	login() {
		const { context } = this.props;
		if (context) {
			context.login();
		}
	}

	render () {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Login Screen</Text>
				<TextInput style={{borderColor: "#000", width: 200, borderWidth: 2}}></TextInput>
				<TextInput style={{borderColor: "#000", width: 200, borderWidth: 2}}></TextInput>
				<TouchableOpacity onPress={this.login.bind(this)}>
					<Text>Iniciar</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Consumer(LoginScreen);