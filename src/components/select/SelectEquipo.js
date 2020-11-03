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

function SelectEquipo({onChange, context}) {
	const [equipos, setEquipos] = useState([]);
	const [selected, setSelected] = useState();

	if (context) {
		useEffect(() => {
			let equiposNew = Array.isArray(context.equipos) ? context.equipos : [] ;
			equiposNew = equiposNew.map(p => {
				return {id: p.IdEquipo, name: p.NombreEquipo};
			});
			setEquipos(equiposNew);
		}, [context.equipos]);
	}

	return (
		<ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{equipos.map((equipo) => {
				return (
					<TouchableOpacity
						key={equipo.id}
						onPress={() => setSelected(equipo.id)}
						style={equipo.id == selected ? InputStyles.itemSelected: InputStyles.itemNormal}>
						<Text style={equipo.id == selected ? InputStyles.itemTextSelected: InputStyles.itemTextNormal}>{equipo.name}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	);
}

export default Consumer(SelectEquipo);