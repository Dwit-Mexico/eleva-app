import React, { useEffect, useState } from 'react';
import { View, Animated, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Consumer } from '../../../../context';
import { FontAwesome5 } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-zoom-viewer';
import { useFocusEffect, useRoute } from '@react-navigation/native';

// Componentes
import BotonWizard from '../../../../components/boton/BotonWizard';

// Styles
import Styles from '../../../../styles/components/WizardStyle';
import ButtonStyles from '../../../../styles/buttons';

function Finalizar({ aceptarAction, finalizarAction, loadingAceptar, loadingFinalizar }) {
	let animatedOpacity = new Animated.Value(0);

	function initOpactity() {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}

	useEffect(() => {
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
				<Text style={Styles.titleStyle}>¿Quieres agregar otro reporte?</Text>
				<View style={{height: 16}}/>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
					<View style={{width: 150}}>
						<BotonWizard style={ButtonStyles.button} onPress={aceptarAction.bind(this)} loading={loadingAceptar}>
							<Text
								allowFontScaling={false}
								style={{color: 'white', fontSize: 18}}>Aceptar</Text>
						</BotonWizard>
					</View>
					<Text>&nbsp;</Text>
					<View style={{width: 150}}>
						<BotonWizard style={ButtonStyles.button} onPress={finalizarAction.bind(this)} loading={loadingFinalizar}>
							<Text
								allowFontScaling={false}
								style={{color: 'white', fontSize: 18}}>Finalizar</Text>
						</BotonWizard>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

export default Consumer(Finalizar);