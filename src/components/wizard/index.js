import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Consumer } from '../../context';

//Styles
import WizardStyle from '../../styles/components/WizardStyle';

const Wizard = ({context, steps}) => {
	const [page, setPage] = useState(1);
	// const [steps, setSteps] = useState([]);
	const [totalSteps, setTotalSteps] = useState(0);

	function prevStep() {
		if (page > 1) {
			context.setStep(page - 1);
		}
	}

	function nextStep() {
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

	return (
		<View style={{flex: 1, flexDirection: 'column', position: 'relative'}}>

			{steps[page - 1]}

			<View style={{flex: 1, position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
				<TouchableOpacity
					onPress={prevStep.bind(this)}
					style={WizardStyle.navigationButton}>
					<Text style={WizardStyle.navigationButtonText}>Anterior</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={WizardStyle.navigationButton}
					onPress={nextStep.bind(this)}>
					<Text style={WizardStyle.navigationButtonText}>Siguiente</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Consumer(Wizard);