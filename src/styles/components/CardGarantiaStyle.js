import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderColor: '#aaa',
		borderWidth: 1,
		flexDirection: 'column',
		marginTop: 2,
		padding: 10,
		backgroundColor: Colores.CardViviendaBG,
		borderRadius: 5
	}
});