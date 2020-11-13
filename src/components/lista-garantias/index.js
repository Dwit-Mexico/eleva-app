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
			let reportes = [];

			context.reportes.filter(r => r.IdEstado == 1 || r.IdEstado == 6 ).forEach(rep => {
				const exist = reportes.find(e => e.IdUnidad == rep.IdUnidad && e.IdArea == rep.IdArea);
				if(!exist) {
					reportes.push({
						id: reportes.length,
						IdUnidad: rep.IdUnidad,
						IdArea: rep.IdArea,
						NombreArea: rep.NombreArea,
						NombreProyecto: rep.NombreProyecto,
						Numero: rep.Numero
					})
				}
			});

			reportes = reportes.sort((a, b) => {
				if (a.IdUnidad > b.IdUnidad)
					return 1;
				if (a.IdUnidad < b.IdUnidad)
					return -1;
				return 0;
			})

			setLista(reportes);

		}, [context.reportes])
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