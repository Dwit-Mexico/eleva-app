import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//Componentes
import Container from '../../components/container';
import ListaGarantias from '../../components/lista-garantias';

function Garantias({navigation}) {
	return (
		<Container>
			<ListaGarantias/>
			<View style={{position: 'absolute', right: 15, bottom: 15}}>
				<TouchableOpacity onPress={() => navigation.navigate('NuevaGarantia')}>
					<FontAwesome5 name="plus" size={25}/>
				</TouchableOpacity>
			</View>
		</Container>
	);
}

export default Garantias;