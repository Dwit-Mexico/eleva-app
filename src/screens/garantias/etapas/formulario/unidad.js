import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectUnidad from '../../../../components/select/SelectUnidad';

function SeleccionarUnidad({unidad, setUnidad}) {
	const animatedOpacity = new Animated.Value(1);

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	function onSelect(opcion) {
		if (setUnidad) {
			setUnidad(opcion);
		}
	}

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
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿En donde ocurrió el problema?</Text>
				<SelectUnidad onSelect = {onSelect.bind(this)} value = {unidad}/>
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarUnidad);
