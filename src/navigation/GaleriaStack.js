import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen */
import Galeria from '../screens/galeria';

const Stack = createStackNavigator();

function GaleriaStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Galería" component={Galeria}/>
		</Stack.Navigator>
	);
}

export default GaleriaStack;