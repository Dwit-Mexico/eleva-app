import { StyleSheet } from 'react-native';

//Colores
import Colores from '../colores';

export default StyleSheet.create({
	card: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colores.loadingLoginScreenSpinner,
		marginTop: 5,
		padding: 10
	}
});