import Request from '../../core/api';

const request = new Request();

export async function getProblemas() {
	console.log('Obteniendo catalogo detalles');
	const response = await request.get('/app/config/get/problemas');
	return response;
};