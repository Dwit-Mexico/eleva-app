import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import CardLista from './CardLista';

//Styles
import Colores from '../../styles/colores';

function ListaDocumentos({ navigation, lista }) {
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
			renderItem 		=	{(card) => 	<CardLista
									navigation	=	{navigation}
									titulo		=	"Carpetas"
									icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
									ruta		=	"ListaReportes"
									background	=	{Colores.bgReportes}/>
								}
			keyExtractor	=	{(item) => `${item.id}`}/>
	);
}

export default ListaDocumentos;