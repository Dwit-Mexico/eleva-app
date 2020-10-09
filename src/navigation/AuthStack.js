import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** SCREENS */
import LoginScreen from '../screens/login';

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
		</Stack.Navigator>
	);
}

export default AuthStack;