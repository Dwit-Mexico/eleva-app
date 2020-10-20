import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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
		<View style={InputStyles.Select}>
			<Select2
				isSelectSingle={true}
				style={{ borderWidth: 0 }}
				colorTheme={Colores.selectTheme}
				popupTitle={`Seleccionar area`}
				title="Seleccione area"
				searchPlaceHolderText="Buscar area"
				cancelButtonText="Cancelar"
				selectButtonText="Aceptar"
				listEmptyTitle="No se encontraron areas diponibles"
				data={areas}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default Consumer(SelectArea);