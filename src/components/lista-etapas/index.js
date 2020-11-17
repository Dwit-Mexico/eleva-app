import React from 'react';
import { ScrollView, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import CardEtapa from './CardEtapa';

//Styles
import Colores from '../../styles/colores';

function ListaViviendas({navigation}) {
	return (
		<ScrollView>
			<CardEtapa
				etapa 		=	{1}
				navigation	=	{navigation}
				titulo		=	"Reportes"
				icon 		=	{<FontAwesome5 name="book-open" size={24} color="black" />}
				ruta		=	"ListaReportes"
				background	=	{Colores.bgReportes}/>
			<CardEtapa
				etapa 		=	{2}
				navigation	=	{navigation}
				titulo		=	"Garantías"
				icon 		=	{<FontAwesome5 name="book-reader" size={24} color="black" />}
				ruta		=	"ListaGarantias"
				background	=	{Colores.bgGarantias}/>
			<CardEtapa
				etapa 		=	{3}
				navigation	=	{navigation}
				titulo		=	"Valoraciones"
				icon 		=	{<FontAwesome5 name="award" size={24} color="black" />}
				ruta		=	"ListaValoraciones"
				background	=	{Colores.bgValoraciones}/>
		</ScrollView>
	);
}

export default ListaViviendas;
