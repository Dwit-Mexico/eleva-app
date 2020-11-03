import { StyleSheet } from 'react-native';

//Colores
import Colores from './colores';

const input = {
	borderColor: '#ffffff',
	borderWidth: 1,
	borderRadius: 5,
	width: 200,
	padding: 5,
	marginBottom: 5,
	marginTop: 5,
	color: Colores.inputs,
	backgroundColor: '#fff'
}

const alignCenter = {
	textAlign: 'center'
}

export default StyleSheet.create({
	LoginUsername: {
		...input,
		...alignCenter
	},
	LoginPassword: {
		...input,
		...alignCenter
	},
	Select: {
		flexDirection: "row",
		width: '100%',
		alignItems: "center",
		borderWidth: 1,
		borderColor: '#555',
		borderRadius: 8
	},
	itemNormal: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#eaeaea',
		marginHorizontal: 2,
		marginVertical: 2
	},
	itemTextNormal: {
		color: '#B29330',
		fontWeight: 'bold',
		fontSize: 18
	},
	itemSelected: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#B29330',
		marginHorizontal: 2,
		marginVertical: 2
	},
	itemTextSelected: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 18
	},
});
