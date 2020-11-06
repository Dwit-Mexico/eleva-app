import React, { useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectArea from '../../../../components/select/SelectArea';

let value;

function SeleccionarArea({setArea, area, context}) {
	const animatedOpacity = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();

		async function init() {
			if (context) {
				const form = await context.getForm();
				if (form.area) {
					value = form.area;
				}
			}
		}

		init();

	}, []);

	function onSelect(opcion) {
		if (setArea) {
			setArea(opcion);
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
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿Dónde tienes el problema?</Text>
				<SelectArea onSelect = {onSelect.bind(this)} value={area}/>
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarArea);