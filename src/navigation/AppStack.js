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
import Camara from '../screens/camara';

function getHeaderTitle(route) {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'garantias';

  	switch (routeName) {
		case 'perfil':
			return 'Perfil';
		case 'garantias':
			return 'Garantías';
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
				name="NuevaGarantia"
				component={NuevaGarantia}
				options={{
					headerTitle: 'Nueva Garantía'
				}}/>
			<Stack.Screen
				name="DetalleGarantia"
				component={DetalleGarantia}
				options={{
					headerTitle: 'Detalle Garantía'
				}}/>
			<Stack.Screen
				name="Camara"
				component={Camara}
				options={{
					header: () => null
				}}/>
		</Stack.Navigator>
	);
}

export default Consumer(AppStack);