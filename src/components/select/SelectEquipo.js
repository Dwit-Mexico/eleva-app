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

function SelectEquipo({onChange, context}) {
	const [equipos, setEquipos] = useState([]);

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
		<View style={ InputStyles.Select }>
			<Select2
				isSelectSingle={true}
				style={{ borderWidth: 0 }}
				colorTheme={Colores.selectTheme}
				popupTitle={`Seleccionar equipo`}
				title="Seleccione equipo"
				searchPlaceHolderText="Buscar equipo"
				cancelButtonText="Cancelar"
				selectButtonText="Aceptar"
				listEmptyTitle="No se encontraron equipos diponibles"
				data={equipos}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default Consumer(SelectEquipo);