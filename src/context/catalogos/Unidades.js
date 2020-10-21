import Request from '../../core/api';

const request = new Request();

export async function getUnidades() {
	console.log('Obteniendo catalogo unidades');
	const response = await request.get('/app/unidades/get/unidades');
	return response;
};