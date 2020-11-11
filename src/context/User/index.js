import { AsyncStorage } from 'react-native';
import Request from '../../core/api';

const request = new Request();

export async function login(usuario, password) {
	const result = await request.post('/app/users/login', { usuario, password });
	if (result.token) {

		this.initApp();

		await AsyncStorage.setItem('LoginUser', JSON.stringify(result));
		this.setState({auth: true, token: result.token});

	} else {
		alert(result.message || 'No se pudo iniciar sesión.');
	}
}

export async function logout() {
	await AsyncStorage.removeItem('LoginUser');
	this.setState({auth: false});
}