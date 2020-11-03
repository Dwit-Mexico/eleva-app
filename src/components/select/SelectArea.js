import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import Select2 from 'react-native-select-two';
import { AntDesign } from '@expo/vector-icons';
import { Consumer } from '../../context';

// Styles
import InputStyles from '../../styles/inputs';

// Colores
import Colores from '../../styles/colores';


function SelectArea({value, onChange, context}) {
	const [areas, setAreas] = useState([]);
	const [selected, setSelected] = useState();

	if (context) {
		useEffect(() => {

			let result = context.areas;

			if (Array.isArray(result)) {
				let areasNew = result;
				areasNew = areasNew.map(p => {
					return {id: p.IdArea, name: p.NombreArea, idTipo: p.IdTipoUnidadArea};
				});
				setAreas(areasNew);
			}

		}, [context.areas]);

		/*useEffect(() => {
			let areasNew = Array.isArray(context.areas) ? context.areas : [] ;
			console.log(areasNew);
			areasNew = areasNew.map(p => {
				return {id: p.IdArea, name: p.NombreArea};
			});
			setAreas(areasNew);
		}, []);*/
	}

	async function selectArea(area) {
		setSelected(area.id);
		console.log(area);
		if (context) {
			await context.getEquipos(area.idTipo);
		}
	}

	return (
		<ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{areas.map((area) => {
				return (
					<TouchableOpacity
						key={area.id}
						onPress={selectArea.bind(this, area)}
						style={area.id == selected ? InputStyles.itemSelected: InputStyles.itemNormal}>
						<Text style={area.id == selected ? InputStyles.itemTextSelected: InputStyles.itemTextNormal}>{area.name}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	);
}

export default Consumer(SelectArea);