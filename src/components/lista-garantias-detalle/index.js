import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Consumer } from '../../context';
import moment from 'moment-timezone';

//Componentes
import CardGarantia from './CardDetalleGarantia';

function ListaGarantiasDetalle({ navigation, etapa, context, lista, reporte }) {
	const [list, setList] = useState([]);
	const [isRefreshing, setRefreshing] = useState(false);

	if (context) {
		useEffect(() => {
			let reportes = lista || [];

			//reportes = reportes.filter(repo => repo.IdEstado == etapa);

			setList(reportes);

		}, [lista])
	}

	async function onRefresh() {
		setRefreshing(true);
		if (context) {
			await context.reloadReportes();
		}
		setRefreshing(false);
	}

	return (
		<FlatList
			data 			=	{list}
			refreshControl	=	{
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh.bind(this)}
					/>
			}
			renderItem 		=	{(card) =>
									<CardGarantia
										key 		=	{card.item.IdSolicitud}
										id 			=	{card.item.IdSolicitud}
										etapa 		=	{etapa}
										navigation	=	{navigation}
										proyecto	=	{card.item.NombreProyecto}
										unidad		=	{card.item.Numero}
										problema	=	{card.item.NombreProblema}
										direccion	=	"direccion de prueba"
										area		=	{card.item.NombreArea}
										fecha		=	{moment(card.item.Fecha).format('DD/MM/YYYY')}
										data		=	{card}
										reporte		=	{reporte}/>
									}
			keyExtractor	=	{(item) => `${item.IdSolicitud}`}/>
	);
}

export default Consumer(ListaGarantiasDetalle);
