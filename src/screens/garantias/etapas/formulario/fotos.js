import React, { useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectArea from '../../../../components/select/SelectArea';

function SeleccionarFotos(props) {
	const animatedOpacity = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	return (
		<View style={{flex: 1}}>
			<Animated.View
				style={{
					flex: 1,
					height: '100%',
					opacity: animatedOpacity,
					// backgroundColor: 'lightgray',
				}}
			>
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿Dónde tienes el problema?</Text>
				<SelectArea />
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarFotos);