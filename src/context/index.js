import React, { Component, createContext } from 'react';
import { AsyncStorage } from 'react-native';

//Funciones
import { login, logout } from './User';

const Context = createContext();

class GlobalContext extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: false,
			login: login.bind(this),
			logout: logout.bind(this)
		}

		this.initUser();
	}

	async componentDidMount() {
		await this.initUser();
	}

	async initUser() {
		//Comprobar si el usuario inició sesión
		let loginUser = await AsyncStorage.getItem('LoginUser');
		if (loginUser) {
			loginUser = JSON.parse(loginUser);
			if (loginUser.token) {
				this.setState({auth: true, token: loginUser.token});
			}
		}
	}

	render() {
		return (
			<Context.Provider value = {this.state}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

const Consumer = Component => {
	return (props) => {
		return (
			<Context.Consumer>
				{context => <Component {...props} context = {context}/>}
			</Context.Consumer>
		)
	}
}

export { GlobalContext, Consumer };
