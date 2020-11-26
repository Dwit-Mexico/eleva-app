import { AsyncStorage } from 'react-native';
import Request from '../../core/api';

const request = new Request();

export async function validar(usuario, password) {
	const result = await request.post('/app/users/validar', { usuario, password });

	if (!result.valido && result.IdPersona) {
		return { activar: true, IdPersona: result.IdPersona };
	} else {
		return { activar: false, usuario };
	}
}

export async function login(usuario, password) {
	const result = await request.post('/app/users/login', { usuario, password });
	if (result.token) {
		await AsyncStorage.setItem('LoginUser', JSON.stringify(result));
		this.setState({auth: true, token: result.token});
	} else {
		alert(result.message || 'No se pudo iniciar sesión.');
	}
}

export async function logout() {
	await AsyncStorage.removeItem('LoginUser');
	await AsyncStorage.removeItem('Catalogos');
	this.setState({auth: false});
}