import Request from '../../core/api';

const request = new Request();

export async function getReportes() {
	// console.log('Obteniendo catalogo reportes');
	this.setState({reportes: []});

	const response = await request.get('/app/garantias/get/single', {});

	if (Array.isArray(response.data)) {
		this.setState({reportes: response.data});
	}

	return response;
};

export async function reloadReportes() {
	console.log('Reload Reportes');
	this.setState({loading_reportes: true});

	const response = await request.get('/app/garantias/get/single', {});

	if (Array.isArray(response.data)) {
		this.setState({reportes: response.data});
	}

	this.setState({loading_reportes: false});
};
