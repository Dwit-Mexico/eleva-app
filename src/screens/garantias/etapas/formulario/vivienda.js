import React from 'react';
import { View, Animated } from 'react-native';
import { Consumer } from '../../../../context';

function SeleccionarVivienda(props) {
	const animatedOpacity = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	return (
		<View>
			<Animated.View
				style={{
					height: 100,
					widht: 100,
					opacity: animatedOpacity,
					backgroundColor: 'lightgray',
				}}
			/>
		</View>
	)
}

export default Consumer(SeleccionarVivienda);
