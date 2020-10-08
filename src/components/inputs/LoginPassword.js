import React from 'react';
import { TextInput } from 'react-native';
//Styles
import InputStyles from '../../styles/inputs';

const inputLoginPassword = () => {
	return (
		<TextInput style={InputStyles.LoginPassword} secureTextEntry={true}>
		</TextInput>
	)
}

export default inputLoginPassword;
