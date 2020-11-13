import React from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';

//Styles
import CardStyles from '../../styles/components/CardEtapaStyle';

function CardEtapa(props) {
	return (
		<TouchableOpacity onPress={()=> props.navigation? props.navigation.navigate(props.ruta, { garantiaEtapa: props.etapa, detalle: true }) : null}>
			<View style={CardStyles.card}>
				<View style={{flex: 1, alignItems: 'center'}}>
					<View style={{flexDirection:'column', justifyContent:'center', padding: 5}}>
						{props.icon}
					</View>
					<View style={{paddingLeft: 15, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{ padding: 5, fontSize: 20, textAlign: 'center' }}>{props.titulo}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default CardEtapa;