import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

function SelectArea({onChange, context}) {
	const [areas, setAreas] = useState([]);

	if (context) {
		useEffect(() => {
			let areasNew = Array.isArray(context.areas) ? context.areas : [] ;
			areasNew = areasNew.map(p => {
				return {id: p.IdArea, name: p.NombreArea};
			});
			setAreas(areasNew);
		}, [context.areas]);
	}

	return (
		<View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{areas.map((area) => {
				return (
					<TouchableOpacity style={{padding: 10, backgroundColor: '#eaeaea', marginHorizontal: 2, marginVertical: 2}}>
						<Text>{area.name}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	);
}

export default Consumer(SelectArea);