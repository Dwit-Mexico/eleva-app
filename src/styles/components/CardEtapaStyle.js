import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderWidth: 0,
		flexDirection: 'column',
		padding: 25,
		margin: 20
	},
	titulo: {
		padding: 5,
		fontSize: 20,
		textAlign: 'center',
		fontSize: 25,
		color: Colores.CardEtapaColor
	}
});