import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import CardLista from './CardLista';

function ListaDocumentos({ navigation, lista, reload }) {
	const [isRefreshing, setRefreshing] = useState(false);

	async function onRefresh() {
		setRefreshing(true);
		if (reload) {
			await reload();
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
			renderItem 		=	{(card) => 	<CardLista
									navigation	=	{navigation}
									item		=	{card.item}/>
								}
			keyExtractor	=	{(item) => `${item.IdDocumento}`}/>
	);
}

export default ListaDocumentos;