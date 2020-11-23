import React from 'react';
import { StatusBar } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Consumer } from '../context';

//Componentes
import BotonNotificaciones from '../components/boton-notificaciones/BotonNotificaciones';

//Stacks
import BottomNavigator from './BottomTabNavigator';

//Screens
import Notificaciones from '../screens/notificaciones';
import GarantiasDetalle from '../screens/garantias/Garantias';
import NuevaGarantia from '../screens/garantias/Nueva';
import DetalleGarantia from '../screens/garantias/Detalle';

import ListaReportes from '../screens/garantias/listas/Reporte';
import ListaGarantias from '../screens/garantias/listas/Garantia';
import ListaValoraciones from '../screens/garantias/listas/Valoraciones';

import ListaDetalleReportes from '../screens/garantias/listas/ReporteDetalle';
import ListaDetalleGarantias from '../screens/garantias/listas/GarantiaDetalle';
import ListaDetalleValoraciones from '../screens/garantias/listas/ValoracionesDetalle';

import DetalleReportes from '../screens/garantias/detalle/Reporte';
import DetalleGarantias from '../screens/garantias/detalle/Garantia';
import DetalleValoraciones from '../screens/garantias/detalle/Valoraciones';

import ListaDocumentos from '../screens/documentos/ListaDocumentos';
import VistaDocumento from '../screens/documentos/documento';

import Camara from '../screens/camara';

function getHeaderTitle(route) {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'reportes';

  	switch (routeName) {
		case 'perfil':
			return 'Perfil';
		case 'reportes':
			return 'Customer Service';
		case 'documentos':
			return 'Documentos';
		case 'galeria':
			return 'Galería';
	}
}

const Stack = createStackNavigator();

function AppStack(props) {

	StatusBar.setBarStyle('dark-content');

	const { context } = props;
	let auth = false;
	if (context) {
		auth = context.auth;
	}

	return (
		<Stack.Navigator mode="modal">
			<Stack.Screen
				name="Main"
				component={BottomNavigator}
				options={({ navigation, route }) => ({ 
					headerTitle: getHeaderTitle(route),
					headerRight: () => <BotonNotificaciones navigation={navigation}/> 
				})}/>

			<Stack.Screen
				name="Notificaciones"
				component={Notificaciones}/>

			<Stack.Screen
				name="GarantiasDetalle"
				component={GarantiasDetalle}
				options={{
					headerTitle: 'Garantía'
				}}/>

			<Stack.Screen
				name="ListaReportes"
				component={ListaReportes}
				options={{
					headerTitle: 'Reportes'
				}}/>
			<Stack.Screen
				name="ListaGarantias"
				component={ListaGarantias}
				options={{
					headerTitle: 'Garantías'
				}}/>
			<Stack.Screen
				name="ListaValoraciones"
				component={ListaValoraciones}
				options={{
					headerTitle: 'Valoraciones'
				}}/>

			<Stack.Screen
				name="ListaDetalleReportes"
				component={ListaDetalleReportes}
				options={{
					headerTitle: 'Detalle Reporte'
				}}/>
			<Stack.Screen
				name="ListaDetalleGarantias"
				component={ListaDetalleGarantias}
				options={{
					headerTitle: 'Garantías'
				}}/>
			<Stack.Screen
				name="ListaDetalleValoraciones"
				component={ListaDetalleValoraciones}
				options={{
					headerTitle: 'Valoraciones'
				}}/>

			<Stack.Screen
				name="DetalleReporte"
				component={DetalleReportes}
				options={{
					headerTitle: 'Reporte'
				}}/>
			<Stack.Screen
				name="DetalleGarantia"
				component={DetalleGarantias}
				options={{
					headerTitle: 'Garantía'
				}}/>
			<Stack.Screen
				name="DetalleValoracion"
				component={DetalleValoraciones}
				options={{
					headerTitle: 'Valoración'
				}}/>
			<Stack.Screen
				name="NuevaGarantia"
				component={NuevaGarantia}
				options={{
					headerTitle: 'Nueva Garantía'
				}}/>
			<Stack.Screen
				name="Camara"
				component={Camara}
				options={{
					header: () => null
				}}/>

			<Stack.Screen
				name="ListaDocumentos"
				component={ListaDocumentos}/>
			<Stack.Screen
				name="VistaDocumento"
				component={VistaDocumento}/>
		</Stack.Navigator>
	);
}

export default Consumer(AppStack);