import React from 'react';
import { ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import CardEtapa from './CardEtapa';

function ListaViviendas({navigation}) {
	return (
		<ScrollView>
			<CardEtapa
				etapa 		=	{1}
				navigation	=	{navigation}
				titulo		=	"Reportes"
				icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
				ruta		=	"ListaReportes"/>
			<CardEtapa
				etapa 		=	{2}
				navigation	=	{navigation}
				titulo		=	"Garantías"
				icon 		=	{<FontAwesome5 name="book-reader" size={24} color="black" />}
				ruta		=	"ListaGarantias"/>
			<CardEtapa
				etapa 		=	{3}
				navigation	=	{navigation}
				titulo		=	"Valoraciones"
				icon 		=	{<FontAwesome5 name="award" size={24} color="black" />}
				ruta		=	"ListaValoraciones"/>
		</ScrollView>
	);
}

export default ListaViviendas;
