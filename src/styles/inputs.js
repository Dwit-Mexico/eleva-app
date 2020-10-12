import { StyleSheet } from 'react-native';

const input = {
	borderColor: '#ffffff',
	borderWidth: 1,
	borderRadius: 5,
	width: 200,
	padding: 5,
	marginBottom: 5,
	marginTop: 5,
	color: '#ffffff',
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
	}
});
