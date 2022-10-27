import { AsyncStorage } from 'react-native';

export async function setUnidad(unidad) {
	this.setState({unidad, area: null, equipo: null, problema: null});
}

export async function setArea(area) {
	this.setState({area, equipo: null, problema: null});
}

export async function setEquipo(equipo) {
	this.setState({equipo, problema: null});
}

export async function setProblema(problema) {
	this.setState({problema});
}

export async function setComentario(comentario) {
	this.setState({comentario});
}

export async function setImagen1(imagen1) {
	this.setState({imagen1});
}

export async function setImagen2(imagen2) {
	this.setState({imagen2});
}

export async function setImagen3(imagen3) {
	this.setState({imagen3});
}

export async function setVideo1(video1) {
	this.setState({video1});
}

export async function getForm() {
	const unidad = this.state.unidad;
	const area = this.state.area;
	const equipo = this.state.equipo;
	const problema = this.state.problema;
	const comentario = this.state.comentario;

	return {
		unidad,
		area,
		equipo,
		problema,
		comentario
	};
}