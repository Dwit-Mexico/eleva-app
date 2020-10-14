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

function SelectArea({viviendas, onChange}) {
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
				data={[{id: 1, name: 'Area1'}, {id: 2, name: 'Area2'}]}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default SelectArea;