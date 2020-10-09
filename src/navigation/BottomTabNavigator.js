import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Stacks
import PerfilStack from './PerfilStack';
import GarantiasStack from './GarantiasStack';
import GaleriaStack from './GaleriaStack';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="perfil"
				component={ PerfilStack }/>
			<Tab.Screen
				name="garantias"
				component={ GarantiasStack }/>
			<Tab.Screen
				name="galeria"
				component={ GaleriaStack }/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;