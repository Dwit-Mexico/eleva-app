import Request from '../../core/api';

const request = new Request();

export async function getAreas(IdUnidad) {
	console.log('Obteniendo catalogo areas');
	const response = await request.get('/app/unidades/get/areas/unidad', {IdUnidad});
	return response;
};