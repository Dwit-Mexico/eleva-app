import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/** Stacks */
import PerfilStack from './PerfilStack';
import GarantiasStack from './GarantiasStack';
import GaleriaStack from './GaleriaStack';

const Tab = createBottomTabNavigator();

function HomeStack() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Perfil"
				component={ PerfilStack }
				options={{ 
					headerLeft: () => (
						<DrawerButton onPress={() => navigation.toggleDrawer()} />
					)
				}}/>
			<Tab.Screen
				name="Garantias"
				component={ GarantiasStack }
				options={{ 
					headerLeft: () => (
						<DrawerButton onPress={() => navigation.toggleDrawer()} />
					)
				}}/>
			<Tab.Screen name="Galería" component={ GaleriaStack } />
		</Tab.Navigator>
	);
}

export default HomeStack;