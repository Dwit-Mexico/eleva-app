import React, { useEffect, useState } from 'react';
import { View, Animated, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// Componentes
import BotonWizard from '../../../../components/boton/BotonWizard';

// Styles
import ButtonStyles from '../../../../styles/buttons';
import { Props } from 'react-native-image-zoom-viewer/built/image-viewer.type';

function SeleccionarFotos({ aceptarAction, finalizarAction, loadingAceptar, loadingFinalizar }) {
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
						<BotonWizard style={ButtonStyles.button} onPress={aceptarAction.bind(this)} loading={loadingAceptar}>
							<Text style={{color: 'white', fontSize: 18}}>Aceptar</Text>
						</BotonWizard>
					</View>
					<Text>&nbsp;</Text>
					<View>
						<BotonWizard style={ButtonStyles.button} onPress={finalizarAction.bind(this)} loading={loadingFinalizar}>
							<Text style={{color: 'white', fontSize: 18}}>Finalizar</Text>
						</BotonWizard>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

export default Consumer(SeleccionarFotos);