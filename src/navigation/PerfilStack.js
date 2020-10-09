import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Perfil from '../screens/perfil';

const Stack = createStackNavigator();

function PerfilStack({navigation}) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Perfil"
				component={Perfil}
				options={{ tabBarLabel: 'Home!' }}/>
		</Stack.Navigator>
	);
}

export default PerfilStack;