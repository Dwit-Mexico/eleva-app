import React, { useEffect, useState } from 'react';
import { View, Animated, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// Styles
import ButtonStyles from '../../../../styles/buttons';

function SeleccionarFotos({ aceptarAction, finalizarAction }) {
	let animatedOpacity = new Animated.Value(0);

	function initOpactity() {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}

	useFocusEffect(() => {
		initOpactity();
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
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿Quieres agregar otro reporte?</Text>
				<View style={{height: 16}}/>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
					<View>
						<TouchableOpacity style={ButtonStyles.button} onPress={aceptarAction.bind(this)}>
							<Text style={{color: 'white', fontSize: 18}}>Aceptar</Text>
						</TouchableOpacity>
					</View>
					<Text>&nbsp;</Text>
					<View>
						<TouchableOpacity style={ButtonStyles.button} onPress={finalizarAction.bind(this)}>
							<Text style={{color: 'white', fontSize: 18}}>Finalizar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarFotos);