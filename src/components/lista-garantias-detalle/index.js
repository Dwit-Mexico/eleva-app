import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Consumer } from '../../context';

//Componentes
import CardGarantia from './CardDetalleGarantia';

function ListaViviendas({ navigation, etapa, context }) {
	const [lista, setLista] = useState([]);

	if (context) {
		useEffect(() => {
			let reportes = context.reportes || [];

			reportes = reportes.filter(repo => repo.IdEstado == etapa);

			setLista(reportes);

		}, [context.reportes])
	}
	
	return (
		<FlatList
			data 		= {lista}
			renderItem 	= {(card) =>
							<CardGarantia
								key 		=	{card.IdSolicitudDetalle}
								id 			=	{card.IdSolicitudDetalle}
								etapa 		=	{etapa}
								navigation	=	{navigation}
								proyecto	=	"Demo1"
								name		=	"Vivienda 1"
								direccion	=	"direccion de prueba"
								area		=	"cocina"
								fecha		=	"2020/10/21"
								data		=	{card}/>
							}
			keyExtractor={(item) => item.id}/>
	);
}

export default Consumer(ListaViviendas);
