import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderColor: '#aaa',
		borderTopColor: '#D4B467',
		borderWidth: 0,
		borderTopWidth: 8,
		flexDirection: 'column',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		backgroundColor: Colores.CardViviendaBG,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	}
});