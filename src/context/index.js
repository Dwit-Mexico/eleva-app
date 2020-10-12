import React, { Component, createContext } from 'react';
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
