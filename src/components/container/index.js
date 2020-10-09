import React from 'react';
import { View } from 'react-native';

//Styles
import Styles from '../../styles/components/ContainerStyle';

const Container = (props) => (
	<View style={Styles.container}>
		{props.children}
	</View>
)

export default Container;