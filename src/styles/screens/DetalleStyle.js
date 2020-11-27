import { StyleSheet } from 'react-native';

import Colores from '../colores';

export default StyleSheet.create({
	backGround: {
		flex: 1,
		backgroundColor: '#000000A1',
	},
	lista: {
		margin: 5,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%'
	},
	listaText: {
		fontSize: 20,
		color: Colores.DetalleText
	},
	button: {
		backgroundColor: '#B29360',
		color: '#ffffff',
		padding: 10,
		width: 150,
		textAlign: 'center',
		borderRadius: 5,
		marginHorizontal: 10
	},
	buttonText: {
		fontSize: 19,
		textAlign: 'center',
		color: '#fff'
	},
	comentarios: {
		width: '100%',
		borderRadius: 8,
		borderColor: '#000',
		backgroundColor: '#fff',
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 17,
		textAlignVertical: "top",
		fontSize: 14,
		minHeight: 100
	},
	imagenesContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
});