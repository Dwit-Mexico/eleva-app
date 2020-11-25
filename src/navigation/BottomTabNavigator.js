import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

//Stacks
import PerfilStack from './PerfilStack';
import GarantiasStack from './GarantiasStack';
import GaleriaStack from './GaleriaStack';
import DocumentosStack from './DocumentosStack';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
	StatusBar.setBarStyle('dark-content');
	return (
		<Tab.Navigator tabBarOptions = {{activeTintColor: '#B29360'}}>
			<Tab.Screen
				name="reportes"
				component={ GarantiasStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="inbox" size = {size} color = {color}/>
					)
				}}/>
			<Tab.Screen
				name="documentos"
				component={ DocumentosStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="file-pdf" size={size} color = {color}/>
					)
				}}/>
			<Tab.Screen
				name="perfil"
				component={ PerfilStack }
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="id-card" size={size} color = {color}/>
					),
				}}/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;