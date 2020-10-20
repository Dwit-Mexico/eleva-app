import Request from '../../core/api';

const request = new Request();

export async function getProblemas() {
	console.log('Obteniendo catalogo problemas');
	const response = await request.get('/app/config/get/problemas');
	return response;
};