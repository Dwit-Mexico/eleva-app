import React from 'react';
import { View, ActivityIndicator } from 'react-native';

//Styles
import Styles from '../../styles/components/LoadingScreenStyle';

const LoadingLoginScreen = (props) => (
	<View style={Styles.loadingLoginScreen}>
		<ActivityIndicator size={'large'} color={Styles.loadingLoginScreenSpinner.color}/>
	</View>
)

export default LoadingLoginScreen;