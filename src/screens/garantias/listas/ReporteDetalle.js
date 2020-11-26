import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Consumer } from '../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment-timezone';

// Componentes
import Container from '../../../components/container';
import ListaGarantiasDetalle from '../../../components/lista-garantias-detalle';
// import BotonNuevo from '../../../components/boton-nuevo/BotonNuevo';

const ListaDetalleReporte = ({ navigation, context }) => {
	const [list, setList] = useState([]);
	const [info, setInfo] = useState({});
	const route = useRoute();

	if (context) {
		useEffect(() => {
			const { params } = route;

			let reportes = context.reportes;

			if (Array.isArray(reportes)) {
				reportes = reportes.filter(r => r.IdArea == params.IdArea && r.IdUnidad == params.IdUnidad && r.IdEstado != 6);
				setList(reportes);
			}

		},[context.reportes]);

		useEffect(() => {
			const { params } = route;

			if(params.info) {
				setInfo(params.info);
			}
		},[route.params]);
	}

	return (
		<Container>
			<View style={{flex: 0.2, flexDirection: 'row', width: '100%', backgroundColor: '#C5C1C5', justifyContent: 'center', alignItems: 'center', padding: 5}}>
				<View style={{flexDirection: "row", width: '50%', alignItems: 'center',  justifyContent: 'flex-start'}}>
					<FontAwesome5 name="map-marker-alt"/>
					<Text style={{fontSize: 19}}>&nbsp; {info.NombreArea}</Text>
				</View>
				<View style={{flexDirection: "column", width: '50%', alignItems: 'flex-end', justifyContent: 'center'}}>
					<Text style={{fontSize: 15, fontWeight: 'bold'}}>{moment(info.Fecha).format('DD/MM/YYYY')}</Text>
					<Text style={{fontSize: 15}}>101-001</Text>
				</View>
			</View>
			<View style={{flex: 1}}>
				<ListaGarantiasDetalle navigation={navigation} etapa = {1} lista={list} reporte={true}/>
			</View>
		</Container>
	)
}

export default Consumer(ListaDetalleReporte);