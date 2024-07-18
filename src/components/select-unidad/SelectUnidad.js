import React from 'react';
import { View } from 'react-native';
import Select2 from 'react-native-select-two';
import { AntDesign } from '@expo/vector-icons';

// Styles
import InputStyles from '../../styles/inputs';

// Colores
import Colores from '../../styles/colores';

function SelectUnidad({unidades, onChange}) {

	function onSelectionsChange(data) {
		if (onChange) {
			onChange(data[0]);
		}
	}

	return (
		<View style={InputStyles.Select}>
			<Select2
				isSelectSingle={true}
				style={{ borderWidth: 0 }}
				colorTheme={Colores.selectTheme}
				popupTitle={`Seleccionar Unidad`}
				title="Seleccione unidad"
				searchPlaceHolderText="Buscar unidad"
				cancelButtonText="Cancelar"
				selectButtonText="Aceptar"
				listEmptyTitle="No se encontraron unidades diponibles"
				data={unidades || []}
				onSelect={data => onSelectionsChange(data)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default SelectUnidad;