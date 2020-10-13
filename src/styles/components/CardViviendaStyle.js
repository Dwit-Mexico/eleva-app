import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderColor: '#aaa',
		borderWidth: 1,
		flexDirection: 'row',
		marginTop: 15,
		padding: 10,
		backgroundColor: Colores.CardViviendaBG,
		borderRadius: 5
	}
});
