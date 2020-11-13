import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Consumer } from '../../context';

//Componentes
import CardGarantia from './CardGarantia';

function ListaViviendas({navigation, context, lista}) {
	const [isRefreshing, setRefreshing] = useState(false);

	async function onRefresh() {
		setRefreshing(true);
		if (context) {
			await context.reloadReportes();
		}
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
										key			=	{card.item.id}
										etapa 		=	{1}
										navigation	=	{navigation}
										item		=	{card.item}
										icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
										ruta		=	"ListaDetalleReportes"/>
								}
			keyExtractor	=	{(item) => `${item.id}`}/>
	);
}

export default Consumer(ListaViviendas);