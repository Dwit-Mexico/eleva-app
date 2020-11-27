import { AsyncStorage, Platform } from 'react-native';
import request from 'superagent';
import { API_URL } from './url';
import ExpoInfo from "expo-constants";

let version_app = '1.0.0';

class Request {
	constructor() {
		this.state = {
			auth: ''
		}

		if (ExpoInfo.manifest) {
			const {version} = ExpoInfo.manifest;
			version_app = version;
		}
	}

	async get(method, data) {
		let auth = '';
		let loginUser = await AsyncStorage.getItem('LoginUser');

		if (loginUser) {
			loginUser = JSON.parse(loginUser);
			auth = loginUser.token;
		}

        const res = request
            .get(`${API_URL}${method}`)
            .query(data)
			.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
			.set('auth', 	auth)
			.set('Accept', 	'application/json')
			.set("app_platform", Platform.OS)
			.set("app_version", version_app)
            .then(res => {
                return res.body || { empty: true };
            })
            .catch(err => {
				if (err.status === 403) {
					err.message = 'Error de permisos.';
				}
				if (err.message) {
					if (err.message.indexOf("Access-Control-Allow-Origin") !== -1)
						return {
							error: true,
							timeout: true,
							message: "Ups! Parace que no hay conexión con el servidor, compruebe que este conectado a internet y pruebe nuevamente.",
						};
					else
						return { error: true, message: err.message };
				} else 
					return { error: true, message: "Error de conexión" };
            });
        return res;
	}

	async post(method, data) {
		let auth = '';
		let loginUser = await AsyncStorage.getItem('LoginUser');

		if (loginUser) {
			loginUser = JSON.parse(loginUser);
			auth = loginUser.token;
		}

        const res = request
            .post(`${API_URL}${method}`)
			.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
			.set('auth', auth)
            .set("Accept", "application/json")
			.set("Content-Type", "application/json")
			.set("app_platform", Platform.OS)
			.set("app_version", version_app)
			.send(data)
            .then(res => {
                return res.body || { empty: true };
            })
            .catch(err => {
				if (err.status === 403) {
					err.message = 'Error de permisos.';
				}
				if (err.message) {
					if (err.message.indexOf("Access-Control-Allow-Origin") !== -1)
						return {
							error: true,
							timeout: true,
							message: "Ups! Parace que no hay conexión con el servidor, compruebe que este conectado a internet y pruebe nuevamente.",
						};
					else
						return { error: true, message: err.message };
				} else 
					return { error: true, message: "Error de conexión" };
			});
        return res;
	}

	async postFile(method, files, data) {
		let auth = '';
		let loginUser = await AsyncStorage.getItem('LoginUser');

		if (loginUser) {
			loginUser = JSON.parse(loginUser);
			auth = loginUser.token;
		}

		const response = await new Promise(res => {
			const postRequest = request.post(`${API_URL}${method}`);

			if (Array.isArray(files)) {
				files.forEach((file, index) => {
					if (file) {
						postRequest.attach(`file_${index + 1}`, file);
					}
				})
			}
			if (data) {
				const keys = Object.keys(data);
				keys.forEach(key => {
					if (data[key] !== undefined) {
						postRequest.field(key, data[key]);
					}
				})
			}

			postRequest
				.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
				.set('auth', auth)
				.set('Accept', 'application/json')
				.set("app_platform", Platform.OS)
				.set("app_version", version_app)
				.then(resp => {
					res(resp.body || { error: true, message: 'error indefinido' });
				})
				.catch(err => {
					if (err.status === 403) {
						err.message = 'Error de permisos.';
					}
					if (err.message) {
						if (err.message.indexOf("Access-Control-Allow-Origin") !== -1)
							res( {
								error: true,
								timeout: true,
								message: "Ups! Parace que no hay conexión con el servidor, compruebe que este conectado a internet y pruebe nuevamente.",
							} );
						else
							res( { error: true, message: err.message } );
					} else 
						res( { error: true, message: "Error de conexión" } );
				});
		});

		console.log('RESPONSE', response);
		return response;
	}
}

export default Request