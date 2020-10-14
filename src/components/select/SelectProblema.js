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

function SelectObjeto({viviendas, onChange}) {
	return (
		<View style={ InputStyles.Select }>
			<Select2
				isSelectSingle={true}
				style={{ borderWidth: 0 }}
				colorTheme={Colores.selectTheme}
				popupTitle={`Seleccionar problema`}
				title="Seleccione problema"
				searchPlaceHolderText="Buscar problema"
				cancelButtonText="Cancelar"
				selectButtonText="Aceptar"
				listEmptyTitle="No se encontraron objeto diponibles"
				data={[{id: 1, name: 'Problema1'}, {id: 2, name: 'Problema2'}]}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default SelectObjeto;