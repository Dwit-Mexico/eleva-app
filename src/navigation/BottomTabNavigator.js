import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 

//Stacks
import PerfilStack from './PerfilStack';
import GarantiasStack from './GarantiasStack';
import GaleriaStack from './GaleriaStack';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
	StatusBar.setBarStyle('dark-content');
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="perfil"
				component={ PerfilStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="id-card" size={size}/>
					)
				}}/>
			<Tab.Screen
				name="garantias"
				component={ GarantiasStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="inbox" size={size}/>
					)
				}}/>
			<Tab.Screen
				name="galeria"
				component={ GaleriaStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="images" size={size}/>
					)
				}}/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;