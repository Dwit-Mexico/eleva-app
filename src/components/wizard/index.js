import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//Styles
import WizardStyle from '../../styles/components/WizardStyle';

const Wizard = (props) => {
	const [page, setPage] = useState(props.page || 1);
	const [steps, setSteps] = useState([]);
	const [totalSteps, setTotalSteps] = useState(0);

	function prevStep() {
		if (props.prevStep) {
			props.prevStep()
		}
		if (page > 1) {
			setPage(page - 1);
		}
	}

	function nextStep() {
		if (props.nexStep) {
			props.nextStep()
		}
		if (page < totalSteps) {
			setPage(page + 1);
		}
	}

	useEffect(() => {
		const propSteps = props.steps;
		if (Array.isArray(propSteps)) {
			setSteps(propSteps);
			setTotalSteps(propSteps.length);
		}
	}, [props.steps])

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

export default Wizard;