import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Consumer } from '../../context';

//Componentes
import CardVivienda from './CardVivienda';

function ListaViviendas({context}) {
	const [unidades, setUnidades] = useState([]);

	if (context) {
		useEffect(() => {
			setUnidades(context.unidades || []);
		}, [context.unidades])
	}

	return (
		<ScrollView
			style = {{height: '50%'}}
			refreshControl = {
				<RefreshControl refreshing={false} onRefresh={() => console.log('on refresh')} />
			}>
			{
				unidades.map((unidad) => {
					return (
						<CardVivienda
							key			=	{unidad.IdUnidad}
							proyecto 	= 	{unidad.Nombre}
							nombre 		= 	{unidad.Numero}
							direccion 	= 	{unidad.Direccion}
							fecha		=	"2020/10/21"/>
					)
				})
			}
		</ScrollView>
	);
}

export default Consumer(ListaViviendas);
