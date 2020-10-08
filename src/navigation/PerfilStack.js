import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//Componentes
import BotonNotificaciones from '../components/boton-notificasiones/BotonNotificaciones';
/** Screen */
import Perfil from '../screens/perfil';

const Stack = createStackNavigator();

function PerfilStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerRight: () => (
					<BotonNotificaciones/>
				)}
			}>
			<Stack.Screen name="Perfil" component={Perfil}/>
		</Stack.Navigator>
	);
}

export default PerfilStack;