import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Garantias from '../screens/garantias';
import NuevaGarantia from '../screens/garantias/Nueva';

const Stack = createStackNavigator();

function GarantiasStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Garantias" component={Garantias}/>
		</Stack.Navigator>
	);
}

export default GarantiasStack;