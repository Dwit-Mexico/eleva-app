import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import Select2 from 'react-native-select-two';
import { FontAwesome5 } from '@expo/vector-icons';
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

function SelectUnidad({onChange, context}) {
	const [unidades, setUnidades] = useState([]);
	const [selected, setSelected] = useState();

	if (context) {
		useEffect(() => {
			let unidadesNew = Array.isArray(context.unidades) ? context.unidades : [];
			unidadesNew = unidadesNew.map(u => {
				return {id: u.IdUnidad, name: u.Numero};
			});
			setUnidades(unidadesNew);
		}, [context.unidades])
	}

	return (
		<ScrollView contentContainerStyle={{width: '100%', flexDirection: 'column', justifyContent: 'center'}}>
			{unidades.map((unidad) => {

				const textStyle = unidad.id == selected ? InputStyles.itemTextSelected: InputStyles.itemTextNormal

				return (
					<TouchableOpacity
						key={unidad.id}
						onPress={() => setSelected(unidad.id)}
						style={unidad.id == selected ? InputStyles.itemSelected: InputStyles.itemNormal}>
							<FontAwesome5
								name="home"
								style={{...textStyle, margin: 10}}/>
							<Text
								style={textStyle}>
									{unidad.name}
							</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	);
}

export default Consumer(SelectUnidad);