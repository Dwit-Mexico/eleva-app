import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Consumer } from '../../context';

//Componentes
import CardGarantia from './CardGarantia';

function ListaViviendas({navigation, context, etapa}) {
	const [lista, setLista] = useState([]);
	const [isRefreshing, setRefreshing] = useState(false);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes || [];

			// reportes = reportes.filter(repo => repo.IdEstado == etapa);
			// console.log(reportes);

			setLista(reportes);

		}, [context.reportes])
	}

	async function onRefresh() {
		setRefreshing(true);
		setRefreshing(false);
	}

	return (
		<FlatList
			data 			=	{lista}
			refreshControl	=	{
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh.bind(this)}
					/>
			}
			renderItem 		=	{(card) => <CardGarantia
										key			=	{card.item.IdGroup}
										etapa 		=	{1}
										navigation	=	{navigation}
										item		=	{card.item}
										icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
										ruta		=	"ListaDetalleReportes"/>
								}
			keyExtractor	=	{(item) => `${item.IdGroup}`}/>
	);
}

export default Consumer(ListaViviendas);