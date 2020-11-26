import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Consumer } from '../context';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Request from '../core/api';

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
// import ListaDetalleGarantias from '../screens/garantias/listas/GarantiaDetalle';

import DetalleReportes from '../screens/garantias/detalle/Reporte';
import DetalleGarantias from '../screens/garantias/detalle/Garantia';
import DetalleValoraciones from '../screens/garantias/detalle/Valoraciones';

import ListaDocumentos from '../screens/documentos/ListaDocumentos';
import VistaDocumento from '../screens/documentos/documento';

import AgregarUsuario from '../screens/perfil/AgregarUsuario';

import Camara from '../screens/camara';

const request = new Request();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

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

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}

const Stack = createStackNavigator();

function AppStack(props) {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		StatusBar.setBarStyle('light-content');

		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
	
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});
	
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});
	
		return () => {
			Notifications.removeNotificationSubscription(notificationListener);
			Notifications.removeNotificationSubscription(responseListener);
		};
	}, []);

	useEffect(() => {
		async function setToken(token) {
			const response = await request.post('/aplicacion/notificaciones/set', { token });
			console.log('PUSH TOKEN', response);
		}

		if (expoPushToken) {
			setToken(expoPushToken);
		}
	}, [expoPushToken]);

	return (
		<Stack.Navigator mode="modal">
			<Stack.Screen
				name="Main"
				component={BottomNavigator}
				options={({ navigation, route }) => ({
					// header: () => null,
					headerTitle: getHeaderTitle(route),
					headerRight: () => <BotonNotificaciones navigation={navigation}/>,
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				})}/>

			<Stack.Screen
				name="Notificaciones"
				component={Notificaciones}
				options={{
					headerTitle: 'Garantía',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>

			<Stack.Screen
				name="GarantiasDetalle"
				component={GarantiasDetalle}
				options={{
					headerTitle: 'Garantía',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>

			<Stack.Screen
				name="ListaReportes"
				component={ListaReportes}
				options={{
					headerTitle: 'Reportes',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="ListaGarantias"
				component={ListaGarantias}
				options={{
					headerTitle: 'Garantías',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="ListaValoraciones"
				component={ListaValoraciones}
				options={{
					headerTitle: 'Valoraciones',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>

			<Stack.Screen
				name="ListaDetalleReportes"
				component={ListaDetalleReportes}
				options={{
					headerTitle: 'Detalle Reporte',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>

			<Stack.Screen
				name="DetalleReporte"
				component={DetalleReportes}
				options={{
					headerTitle: 'Reporte',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="DetalleGarantia"
				component={DetalleGarantias}
				options={{
					headerTitle: 'Garantía',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="DetalleValoracion"
				component={DetalleValoraciones}
				options={{
					headerTitle: 'Valoración',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="NuevaGarantia"
				component={NuevaGarantia}
				options={{
					headerTitle: 'Nueva Garantía',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>
			<Stack.Screen
				name="Camara"
				component={Camara}
				options={{
					header: () => null
				}}/>

			<Stack.Screen
				name="ListaDocumentos"
				component={ListaDocumentos}
				options={({ route }) => ({
					headerTitle: route.params.title.toUpperCase() || '',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				})}/>
			<Stack.Screen
				name="VistaDocumento"
				component={VistaDocumento}
				options={({ route }) => ({
					headerTitle: route.params.title || '',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				})}/>

			<Stack.Screen
				name="AgregarUsuario"
				component={AgregarUsuario}
				options={{
					headerTitle: 'Agregar Inquilino',
					headerStyle: {
						backgroundColor: '#4C4C4C'
					},
					headerTintColor: '#B29360'
				}}/>

		</Stack.Navigator>
	);
}

export default Consumer(AppStack);