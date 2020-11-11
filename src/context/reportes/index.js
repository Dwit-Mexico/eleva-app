import Request from '../../core/api';

const request = new Request();

export async function getReportes() {
	// console.log('Obteniendo catalogo reportes');
	this.setState({reportes: []});

	const response = await request.get('/app/garantias/get', {});

	if (Array.isArray(response.data)) {
		this.setState({reportes: response.data});
	}

	return response;
};
