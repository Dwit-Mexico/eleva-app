import { AsyncStorage } from 'react-native';
import request from 'superagent';
import { API_URL } from './url';

class Request {
	constructor() {
		this.setAuth();
		this.state = {
			auth: ''
		}
	}

	async setAuth() {
		let loginUser = await AsyncStorage.getItem('LoginUser');

		if (loginUser) {
			loginUser = JSON.parse(loginUser);
			this.state.auth = loginUser.token;
		}
	}

	async get(method, data) {
        const res = await request
            .get(`${API_URL}${method}`)
            .query(data)
			.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
			.set('auth', 	this.state.auth)
            .set('Accept', 	'application/json')
            .then(res => {
                return res.body || { empty: true };
            })
            .catch(err => {
				if (err.status === 403) {
					err.message = 'Error de permisos.';
				}
                return { error: true, message: err.message};
            });
        return res;
	}

	async post(method, data) {
        const res = await request
            .post(`${API_URL}${method}`)
            .send(data)
			.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
			.set('auth', 	this.state.auth)
            .set('Accept', 	'application/json')
            .then(res => {
                return res.body || { empty: true };
            })
            .catch(err => {
				if (err.status === 403) {
					err.message = 'Error de permisos.';
				}
                return { error: true, message: err.message};
            });
        return res;
	}

	async postFile(method, files, data) {
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
					if (data[key]) {
						postRequest.field(key, data[key]);
					}
				})
			}

			postRequest
				.set('api_key', '87882e138de18177515be74e7e098cd81a79cc44fcfb0097e55230b2280df6b1')
				.set('auth', 	this.state.auth)
				.set('Accept', 	'application/json')
				.then(resp => {
					res(resp.body || { error: true, message: 'error indefinido' });
				})
				.catch(error => {
					res(error);
				});
		});

		console.log('RESPONSE', response);
		return response;
	}
}

export default Request