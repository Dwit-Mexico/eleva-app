import * as React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalContext } from '../context/index';

/** Navigation */
import Navigation from '../navigation/Navigation';

function Routes() {
	return (
		<GlobalContext>
			<KeyboardAvoidingView style={{flex: 1}}>
				<Navigation/>
			</KeyboardAvoidingView>
		</GlobalContext>
	);
}
  
export default Routes;