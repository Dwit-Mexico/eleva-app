import React, { useEffect, useRef } from 'react';
import { View, Animated, Text } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectEquipo from '../../../../components/select/SelectEquipo';

function SeleccionarEquipo({equipo, setEquipo}) {
	const animatedOpacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	function onSelect(opcion) {
		if (setEquipo) {
			setEquipo(opcion);
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
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿Que equipo presenta problemas?</Text>
				<SelectEquipo onSelect = {(opcion) => onSelect(opcion)} value={equipo}/>
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarEquipo);