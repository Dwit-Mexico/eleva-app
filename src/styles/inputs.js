import { StyleSheet } from 'react-native';

const input = {
	borderColor: '#123456',
	borderWidth: 1,
	borderRadius: 5,
	width: 200,
	padding: 5,
	marginBottom: 5,
	marginTop: 5
}

export default StyleSheet.create({
	LoginUsername: {
		...input
	},
	LoginPassword: {
		...input
	}
});
