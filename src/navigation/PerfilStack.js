import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen */
import Perfil from '../screens/perfil';

const Stack = createStackNavigator();

function PerfilStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Perfil" component={Perfil}/>
		</Stack.Navigator>
	);
}

export default PerfilStack;