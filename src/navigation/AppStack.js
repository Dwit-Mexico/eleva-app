import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** SCREENS */
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Inicio" component={ HomeScreen } />
		</Stack.Navigator>
	);
}

export default HomeStack;