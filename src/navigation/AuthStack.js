import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** SCREENS */
import LoginScreen from '../screens/Login';
import RecuperarPassword from '../screens/Login/RecuperarPassword';
import ActualizarPassword from '../screens/Login/ActualizarPassword';

const Stack = createStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					header: () => null
				}}
				name="Login"
				component={ LoginScreen } />
			<Stack.Screen
				options={{
					header: () => null
				}}
				name="RecuperarPassword"
				component={ RecuperarPassword } />
			<Stack.Screen
				options={{
					header: () => null
				}}
				name="ActualizarPassword"
				component={ ActualizarPassword } />
		</Stack.Navigator>
	);
}

export default AuthStack;