import React, { Component, createContext } from 'react';
import { AsyncStorage } from 'react-native';

//Funciones
import { login, logout } from './user';
import { getUnidades } from './catalogos/Unidades';
import { getAreas } from './catalogos/Areas';
import { getEquipos } from './catalogos/Equipos';
import { getProblemas } from './catalogos/Problemas';
import { setStep } from './catalogos/Wizard';
import {
	getForm,
	setUnidad,
	setArea,
	setEquipo,
	setProblema,
	setComentario,
	setImagen1,
	setImagen2,
	setImagen3
} from './form';

const Context = createContext();

class GlobalContext extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initApp: this.initApp.bind(this),
			auth: false,
			login: login.bind(this),
			logout: logout.bind(this),
			unidades: [],
			areas: [],
			equipos: [],
			problemas: [],
			getAreas: getAreas.bind(this),
			getEquipos: getEquipos.bind(this),
			step: 1,
			setStep: setStep.bind(this),
			unidad: null,
			setUnidad: setUnidad.bind(this),
			area: null,
			setArea: setArea.bind(this),
			equipo: null,
			setEquipo: setEquipo.bind(this),
			problema: null,
			setProblema: setProblema.bind(this),
			comentario: null,
			setComentario: setComentario.bind(this),
			imagen1: null,
			setImagen1: setImagen1.bind(this),
			imagen2: null,
			setImagen2: setImagen2.bind(this),
			imagen3: null,
			setImagen3: setImagen3.bind(this),
			getForm: getForm.bind(this)
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

		const unidades = await getUnidades();
		if (unidades.data) {

			this.setState({unidades: unidades.data});

			if (Array.isArray(unidades.data)) {

				catalogoObj.unidades = unidades.data;

				if (unidades.data.length == 1) {
					const unidad = unidades.data[0];
					const areas = await getAreas(unidad.IdUnidad);
				}
			}
		}

		/*const areas = await getAreas();
		if (areas.areas) {
			catalogoObj.areas = areas.areas;
			this.setState({areas: areas.areas});
		}

		const equipos = await getEquipos();
		if (equipos.equipos) {
			catalogoObj.equipos = equipos.equipos;
			this.setState({equipos: equipos.equipos});
		}*/

		const problemas = await getProblemas();
		if (problemas.problemas) {
			catalogoObj.problemas = problemas.problemas;
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
