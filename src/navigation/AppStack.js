import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Consumer } from '../context';

//Componentes
import BotonNotificaciones from '../components/boton-notificasiones/BotonNotificaciones';

//Stacks
import BottomNavigator from './BottomTabNavigator';

//Screens
import Notificaciones from '../screens/notificaciones';

const Stack = createStackNavigator();

class AppStack extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render () {
		const { context } = this.props;
		let auth = false;
		if (context) {
			auth = context.auth;
		}
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Main"
					component={BottomNavigator}
					options={({ navigation }) => ({ headerRight: () => <BotonNotificaciones navigation={navigation}/> })}/>
				<Stack.Screen
					name="Notificaciones"
					component={Notificaciones}/>
			</Stack.Navigator>
		);
	}
}

export default Consumer(AppStack);