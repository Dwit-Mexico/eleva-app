import Request from '../../core/api';

const request = new Request();

export async function getUnidades() {
	const response = await request.get('/app/unidades/get/unidades');
	return response;
};

export async function getSetUnidades() {
	const response = await request.get('/app/unidades/get/unidades');
	this.setState({unidades: response.data});
};
