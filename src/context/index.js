import React, { Component, createContext } from 'react';
import { AsyncStorage } from 'react-native';

//Funciones
import { login, logout } from './user';
import { getAreas } from './catalogos/Areas';
import { getEquipos } from './catalogos/Equipos';
import { getProblemas } from './catalogos/Problemas';

const Context = createContext();

class GlobalContext extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: false,
			login: login.bind(this),
			logout: logout.bind(this),
			viviendas: [],
			areas: [],
			equipos: [],
			problemas: []
		}

		this.initUser();
	}

	async componentDidMount() {
		await this.initUser();
		await this.initApp();
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

	async initApp() {
		let catalogos = await AsyncStorage.getItem('Catalogos');
		if (catalogos) {
			catalogos = JSON.parse(catalogos);
			this.setState({
				areas: catalogos.areas,
				objetos: catalogos.objetos,
				problemas: catalogos.problemas
			});
		}


		const catalogoObj = {
			areas: [],
			objetos: [],
			equipos: []
		};

		const areas = await getAreas();
		if (areas.areas) {
			catalogoObj.areas = areas.areas;
			this.setState({areas: areas.areas});
		}

		const equipos = await getEquipos();
		if (equipos.equipos) {
			catalogoObj.equipos = equipos.equipos;
			this.setState({equipos: equipos.equipos});
		}

		const problemas = await getProblemas();
		if (problemas.problemas) {
			catalogoObj.problemas = areas.problemas;
			this.setState({problemas: problemas.problemas});
		}

		AsyncStorage.setItem('Catalogos', JSON.stringify(catalogoObj));
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
