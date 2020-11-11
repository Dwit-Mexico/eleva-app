import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Garantias from '../screens/garantias/ListaEtapas';

const Stack = createStackNavigator();

function GarantiasStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Garantias" component={Garantias}/>
		</Stack.Navigator>
	);
}

export default GarantiasStack;