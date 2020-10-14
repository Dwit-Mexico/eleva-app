import React from 'react';
import { View } from 'react-native';
import Select2 from 'react-native-select-two';
import { AntDesign } from '@expo/vector-icons';

// Styles
import InputStyles from '../../styles/inputs';

// Colores
import Colores from '../../styles/colores';

onSelectionsChange = (data, onChange) => {
	if (onChange) {
		onChange(data[0]);
	}
}

function SelectVivienda({viviendas, onChange}) {
	return (
		<View style={InputStyles.Select}>
			<Select2
				isSelectSingle={true}
				style={{ borderWidth: 0 }}
				colorTheme={Colores.selectTheme}
				popupTitle={`Seleccionar vivienda`}
				title="Seleccione vivienda"
				searchPlaceHolderText="Buscar vivienda"
				cancelButtonText="Cancelar"
				selectButtonText="Aceptar"
				listEmptyTitle="No se encontraron viviendas diponibles"
				data={[{id: 1, name: 'Vivienda1'}, {id: 2, name: 'Vivienda2'}]}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default SelectVivienda;