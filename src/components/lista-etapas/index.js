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
				titulo		=	"REPORTES"
				icon 		=	{<FontAwesome5 name="book-open" size={32} color={Colores.CardEtapaColor} />}
				ruta		=	"ListaReportes"/>
			<CardEtapa
				etapa 		=	{2}
				navigation	=	{navigation}
				titulo		=	"GARANTÍAS"
				icon 		=	{<FontAwesome5 name="book-reader" size={32} color={Colores.CardEtapaColor} />}
				ruta		=	"ListaGarantias"/>
			<CardEtapa
				etapa 		=	{3}
				navigation	=	{navigation}
				titulo		=	"VALORACIONES"
				icon 		=	{<FontAwesome5 name="award" size={32} color={Colores.CardEtapaColor} />}
				ruta		=	"ListaValoraciones"/>
			<CardEtapa
				etapa 		=	{4}
				navigation	=	{navigation}
				titulo		=	"HISTORIAL"
				icon 		=	{<FontAwesome5 name="history" size={32} color={Colores.CardEtapaColor} />}
				ruta		=	"ListaValoraciones"/>
		</ScrollView>
	);
}

export default ListaViviendas;
