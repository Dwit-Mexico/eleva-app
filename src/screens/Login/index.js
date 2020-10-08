import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';
//Components
import LoginUsername from '../../components/inputs/LoginUsername';
import LoginPassword from '../../components/inputs/LoginPassword';
//Styles
import TextStyle from '../../styles/text';

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
				<Text style={TextStyle.LoginTitle}>
					Desarrollos Urbanísticos
				</Text>
				<LoginUsername/>
				<LoginPassword/>
				<TouchableOpacity onPress={this.login.bind(this)}>
					<Text>Iniciar</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Consumer(LoginScreen);