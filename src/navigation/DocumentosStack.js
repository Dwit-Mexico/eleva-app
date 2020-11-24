import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen */
import Documentos from '../screens/documentos/Carpetas';

const Stack = createStackNavigator();

function DocumentosStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Documentos" component={Documentos}/>
		</Stack.Navigator>
	);
}

export default DocumentosStack;