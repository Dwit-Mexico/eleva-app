import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import Select2 from 'react-native-select-two';
import { AntDesign } from '@expo/vector-icons';
import { Consumer } from '../../context';

// Styles
import InputStyles from '../../styles/inputs';

// Colores
import Colores from '../../styles/colores';

onSelectionsChange = (data, onChange) => {
	if (onChange) {
		onChange(data[0]);
	}
}

function SelectProblema({ onSelect, value, context }) {
	const [problemas, setProblemas] = useState([]);
	const [selected, setSelected] = useState();

	if (context) {
		useEffect(() => {
			let problemasNew = Array.isArray(context.problemas) ? context.problemas : [] ;
			problemasNew = problemasNew.map(p => {
				return {id: p.IdProblema, name: p.NombreProblema};
			});
			setProblemas(problemasNew);

			if (value) {
				setSelected(value);
			}

		}, [context.problemas]);
	}

	async function selectProblema(id) {
		setSelected(id)

		if (onSelect) {
			onSelect(id);
		}
	}


	return (
		<ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{problemas.map((problema) => {
				return (
					<TouchableOpacity
						key={problema.id}
						onPress={selectProblema.bind(this, problema.id)}
						style={problema.id == selected ? InputStyles.itemSelected: InputStyles.itemNormal}>
						<Text style={problema.id == selected ? InputStyles.itemTextSelected: InputStyles.itemTextNormal}>{problema.name}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	);
}

export default Consumer(SelectProblema);