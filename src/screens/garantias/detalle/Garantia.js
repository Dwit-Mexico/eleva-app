import React from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { Consumer } from '../../../context';

// Componentes
import Container from '../../../components/container';
import SelectFechas from '../../../components/select/SelectFechas';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';

// Styles
import TextStyle from '../../../styles/text';

const DetalleGarantia = ({ navigation }) => {
	return (
		<Container>
			<ScrollView style = {{flex: 1}}>
				<Text style={TextStyle.EtapaTitulo}>Etapa 2</Text>

				<View style={{height: 8}}/>

				<Text style={{textAlign: 'center', color: '#000'}}>Seleccione la fecha para la reparación</Text>

				<View style={{height: 8}}/>

				<SelectFechas onChange = {(data) => console.log('SelectFecha', data)}/>

				<View style={{height: 8}}/>

				<TextInput
					placeholder="Escriba sus comentarios"
					style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
					multiline
					numberOfLines={6}
					maxLength={1500}/>

				<View style={{height: 32}}/>

				<View style={{flexDirection: 'row', justifyContent: 'center'}}>
					<BotonEnviar onSubmit = {(submit) => console.log(submit)}/>
				</View>

			</ScrollView>
		</Container>
	)
}

export default Consumer(DetalleGarantia);
