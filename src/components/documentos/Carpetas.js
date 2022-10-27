import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import CardCarpeta from './CardCarpeta';

//Styles
import Colores from '../../styles/colores';

function CarpetasDocumentos({ navigation, lista, reload }) {
	const [isRefreshing, setRefreshing] = useState(false);

	async function onRefresh() {
		setRefreshing(true);
		if (reload) {
			await reload();
		}
		setRefreshing(false);
	}

	return (
		<FlatList
			data={lista}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh.bind(this)}
				/>
			}
			renderItem={(card) => <CardCarpeta
				navigation={navigation}
				item={card.item} />
			}
			keyExtractor={(item) => `${item.IdFolder}`} />
	);
}

export default CarpetasDocumentos;
