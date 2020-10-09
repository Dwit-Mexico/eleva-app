import React, { Component } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Consumer } from '../context';

//Componentes
import BotonNotificaciones from '../components/boton-notificasiones/BotonNotificaciones';

//Stacks
import BottomNavigator from './BottomTabNavigator';

//Screens
import Notificaciones from '../screens/notificaciones';
import NuevaGarantia from '../screens/garantias/Nueva';

function getHeaderTitle(route) {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'perfil';

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

class AppStack extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render () {
		const { context } = this.props;
		let auth = false;
		if (context) {
			auth = context.auth;
		}
		return (
			<Stack.Navigator>
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
					name="NuevaGarantia"
					component={NuevaGarantia}/>
			</Stack.Navigator>
		);
	}
}

export default Consumer(AppStack);