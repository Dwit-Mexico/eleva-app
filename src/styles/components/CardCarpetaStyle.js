import { StyleSheet } from 'react-native';

// Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: '#eaeaea',
		paddingVertical: 30,
		paddingLeft: 20
	},
	cardLista: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: '#eaeaea',
		padding: 10
	},
	text: {
		marginLeft: 25,
		fontSize: 18,
		color: Colores.CardCarpetaColor,
		fontWeight: 'bold'
	}
});