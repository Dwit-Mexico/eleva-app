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
		textAlign: 'center',
		fontSize: 18
	},
	logoutButton: {
		color: Colores.logoutButtonText,
		textAlign: 'center',
		fontSize: 18
	},
	EtapaTitulo: {
		fontSize: 18,
		color: Colores.titulos,
		fontWeight: 'bold',
		textAlign: 'right',
		marginVertical: 10
	},
});