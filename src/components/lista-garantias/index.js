import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Consumer } from '../../context';

//Componentes
import CardGarantia from './CardGarantia';

function ListaViviendas({navigation, context, etapa}) {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes || [];

			// reportes = reportes.filter(repo => repo.IdEstado == etapa);
			// console.log(reportes);

			setLista(reportes);

		}, [context.reportes])
	}

	return (
		<FlatList
			data 		= {lista}
			renderItem 	= {(card) =>
								<CardGarantia
									key			=	{card.IdUnidad + card.IdArea}
									etapa 		=	{1}
									navigation	=	{navigation}
									titulo		=	{card.Numero}
									icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
									ruta		=	"ListaReportes"/>
							}
			keyExtractor={(item) => item.IdUnidad + item.IdArea}/>
	);
}

export default Consumer(ListaViviendas);