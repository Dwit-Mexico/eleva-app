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

function SelectVivienda({onChange, context}) {
	const [unidades, setUnidades] = useState([]);

	if (context) {
		useEffect(() => {
			let unidadesNew = Array.isArray(context.unidades) ? context.unidades : [];
			unidadesNew = unidadesNew.map(u => {
				return {id: u.IdUnidad, name: u.Numero};
			});
			console.log(unidadesNew);
			setUnidades(unidadesNew);
		}, [context.unidades])
	}

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
				data={unidades}
				onSelect={data => onSelectionsChange(data, onChange)}
				onRemoveItem={data => onSelectionsChange(data)}
			/>
			<AntDesign style={{ right: 25 }} name="caretdown" color="grey" size={10} />
		</View>
	);
}

export default Consumer(SelectVivienda);