import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flex: 1,
		borderColor: '#aaa',
		borderBottomColor: Colores.CardGarantiaTitulo,
		borderWidth: 0,
		borderBottomWidth: 5,
		flexDirection: 'column',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#00000082'
	}
});