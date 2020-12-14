import Request from '../../core/api';

const request = new Request();

export async function getReportes() {
	// console.log('Obteniendo catalogo reportes');

	const response = await request.get('/app/garantias/get/single', {});

	if (Array.isArray(response.data)) {
		this.setState({reportes: response.data});
	}

	return response;
};

export async function getReportesAgrupados() {
	// console.log('Obteniendo catalogo reportes');
	const response = await request.get('/app/garantias/get', {});
	if (Array.isArray(response.data)) {
		this.setState({reportesAgrupados: response.data});
	}

	return response;
};

export async function reloadReportes() {

	this.setState({loading_reportes: true});

	const response = await request.get('/app/garantias/get/single', {});

	if (Array.isArray(response.data)) {
		this.setState({reportes: response.data});
	}

	this.setState({loading_reportes: false});
};

export async function reloadReportesAgrupados() {

	this.setState({loading_reportes: true});

	const response = await request.get('/app/garantias/get', {});

	if (Array.isArray(response.data)) {
		this.setState({reportesAgrupados: response.data});
	}

	this.setState({loading_reportes: false});
};
