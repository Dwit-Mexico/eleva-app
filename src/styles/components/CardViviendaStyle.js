import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderColor: '#aaa',
		borderTopColor: '#D4B467',
		borderWidth: 0,
		borderTopWidth: 6,
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 5,
		padding: 5,
		backgroundColor: Colores.CardViviendaBG,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	}
});
