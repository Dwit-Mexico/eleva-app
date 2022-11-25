import React, { useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { Consumer } from '../../../../context';

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
		<View style={{ flex: 1 }}>
			<Animated.View
				style={{
					flex: 1,
					height: '100%',
					opacity: animatedOpacity
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff', padding: 10, }}>
					Para la atención de los detalles señalados en este reporte,
					el departamento de customer service contara con 48 hrs.
					para contactar al propietario o inquilino a fin de agendar una cita
					conveniente a ambos lados para ejecutar dichos trabajos.
				</Text>
				<Text style={{ fontSize: 18, color: '#fff', padding: 10 }}>
					<Text style={{ fontWeight: 'bold' }}>
						IMPORTANTE:
					</Text>
					{' '}El propietario o inquilino tendrá que estar presente
					al momento de que se este realizando los trabajos en el departamento.
				</Text>
				<View style={{ flex: 1, justifyContent: 'center', paddingBottom: 120 }}>
					<Text style={Styles.titleStyle}>¿Quieres agregar otro reporte?</Text>
					<View style={{ height: 16 }} />
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ width: 150 }}>
							<BotonWizard style={ButtonStyles.button} onPress={aceptarAction.bind(this)} loading={loadingAceptar}>
								<Text
									allowFontScaling={false}
									style={{ color: 'white', fontSize: 18 }}>Aceptar</Text>
							</BotonWizard>
						</View>
						<Text>&nbsp;</Text>
						<View style={{ width: 150 }}>
							<BotonWizard style={ButtonStyles.button} onPress={finalizarAction.bind(this)} loading={loadingFinalizar}>
								<Text
									allowFontScaling={false}
									style={{ color: 'white', fontSize: 18 }}>Finalizar</Text>
							</BotonWizard>
						</View>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

export default Consumer(Finalizar);