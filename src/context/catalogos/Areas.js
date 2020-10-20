import Request from '../../core/api';

const request = new Request();

export async function getAreas() {
	console.log('Obteniendo catalogo areas');
	const response = await request.get('/app/config/get/areas');
	return response;
};