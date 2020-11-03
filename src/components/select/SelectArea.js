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

			const fetchData = async () => {
				let result = await context.getAreas(5);
				console.log(result)
				if (Array.isArray(result.data)) {
					let areasNew = result.data;
					console.log(areasNew);
					areasNew = areasNew.map(p => {
						return {id: p.IdArea, name: p.NombreArea};
					});
					setAreas(areasNew);
				}
			}

			fetchData();

		}, []);

		/*useEffect(() => {
			let areasNew = Array.isArray(context.areas) ? context.areas : [] ;
			console.log(areasNew);
			areasNew = areasNew.map(p => {
				return {id: p.IdArea, name: p.NombreArea};
			});
			setAreas(areasNew);
		}, []);*/
	}

	function selectArea(id) {
		setSelected(id);
		if (onChange) {
			onChange(id);
		}
	}

	return (
		<ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{areas.map((area) => {
				return (
					<TouchableOpacity
						key={area.id}
						onPress={() => setSelected(area.id)}
						style={area.id == selected ? InputStyles.itemSelected: InputStyles.itemNormal}>
						<Text style={area.id == selected ? InputStyles.itemTextSelected: InputStyles.itemTextNormal}>{area.name}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	);
}

export default Consumer(SelectArea);