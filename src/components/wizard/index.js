import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';

// Componentes
import BotonEnviar from '../boton-enviar/BotonEnviar';

// Styles
import WizardStyle from '../../styles/components/WizardStyle';

const Wizard = ({context, steps, ultimo, onSubmit, loading, terminado}) => {
	const [page, setPage] = useState(1);
	// const [steps, setSteps] = useState([]);
	const [totalSteps, setTotalSteps] = useState(0);

	function prevStep() {
		if (page > 1) {
			context.setStep(page - 1);
		}
	}

	function nextStep() {
		// Validar Seleccion
		if (page == 1 && !context.unidad) {
			Alert.alert(null, 'Selecciona una Unidad');
			return;
		}
		if (page == 2 && !context.area) {
			Alert.alert(null, 'Selecciona una Área');
			return;
		}
		if (page == 3 && !context.equipo) {
			Alert.alert(null, 'Selecciona un Equipo');
			return;
		}
		if (page == 4 && !context.problema) {
			Alert.alert(null, 'Selecciona un Detalle');
			return;
		}

		// Continuar a la siguiente pantalla
		if (page < totalSteps && context) {
			context.setStep(page + 1);
		}
	}

	useEffect(() => {
		const propSteps = steps;
		if (Array.isArray(propSteps)) {
			// setSteps(propSteps);
			setTotalSteps(propSteps.length);
		}
	}, [steps]);

	if (context) {
		useEffect(() => {
			setPage(context.step);
		}, [context.step]);
	}

	useEffect(() => {
		if(terminado) {
			context.setStep(steps.length);
		}
	}, [terminado])

	return (
		<View style={{flex: 1, flexDirection: 'column', position: 'relative'}}>
			{/*<Text>{page} {ultimo}</Text>*/}
			{steps[page - 1]}

			{/*console.log(terminado)*/}

			{!terminado?
				<View style={{flex: 1, position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
					<TouchableOpacity
						onPress={prevStep.bind(this)}
						style={WizardStyle.navigationButton}>
						<Text
							allowFontScaling={false}
							style={WizardStyle.navigationButtonText}>
								Anterior
						</Text>
					</TouchableOpacity>
					{page == ultimo ?
						<BotonEnviar onSubmit = {onSubmit} loading = {loading}/>
						:
						<TouchableOpacity
							style={WizardStyle.navigationButton}
							onPress={nextStep.bind(this)}>
							<Text
								allowFontScaling={false}
								style={WizardStyle.navigationButtonText}>
									Siguiente
							</Text>
						</TouchableOpacity>
					}
				</View>
				:
				null
			}
		</View>
	)
}

export default Consumer(Wizard);