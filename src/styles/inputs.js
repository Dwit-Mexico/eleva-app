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
	}
});
