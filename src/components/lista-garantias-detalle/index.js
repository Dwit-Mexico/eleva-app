import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Consumer } from '../../context';

//Componentes
import CardGarantia from './CardDetalleGarantia';

function ListaGarantiasDetalle({ navigation, etapa, context, lista }) {
	const [list, setList] = useState([]);
	const [isRefreshing, setRefreshing] = useState(false);

	if (context) {
		useEffect(() => {
			let reportes = lista || [];

			// reportes = reportes.filter(repo => repo.IdEstado == etapa);

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
										key 		=	{card.IdSolicitud}
										id 			=	{card.IdSolicitud}
										etapa 		=	{etapa}
										navigation	=	{navigation}
										proyecto	=	"Demo1"
										name		=	"Vivienda 1"
										direccion	=	"direccion de prueba"
										area		=	"cocina"
										fecha		=	"2020/10/21"
										data		=	{card}/>
									}
			keyExtractor	=	{(item) => `${item.IdSolicitud}`}/>
	);
}

export default Consumer(ListaGarantiasDetalle);
