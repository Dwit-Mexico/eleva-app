import Request from '../../core/api';

const request = new Request();

export async function getEquipos() {
	console.log('Obteniendo catalogo equipo');
	const response = await request.get('/app/config/get/equipos');
	return response;
};