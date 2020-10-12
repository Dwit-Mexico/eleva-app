import { StyleSheet } from 'react-native';

//Colores
import Colores from './colores';

export default StyleSheet.create({
	LoginTitle: {
		fontSize: 18,
		color: Colores.tituloLogin
	},
	loginButton: {
		color: Colores.loginButtonText,
		textAlign: 'center'
	}
});