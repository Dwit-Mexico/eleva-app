import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Componentes
import Container from '../../../components/container';
import BotonEnviar from '../../../components/boton-enviar/BotonEnviar';

// Styles
import TextStyle from '../../../styles/text';

const DetalleValoracion = () => {
	const [respuesta, setRespuesta] = useState(null);

	return (
		<Container>
			<ScrollView style={{flex: 1}}>

				<Text style={TextStyle.EtapaTitulo}>Etapa 3</Text>

				<Text style={{textAlign: 'justify', color: '#000'}}>
					SI la respuesta es SI, por favor valore nuestro servicio de atención al cliente.
					En caso de que No, por favor indíquenos el motivo y agendaremos otra cita.
				</Text>

				<View style={{height: 16}}/>

				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<View style={{width: 100, padding: 5}}>
						<Button title = "Si" color = {respuesta == 'si'? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta('si')}/>
					</View>
					<View style={{width: 100, padding: 5}}>
						<Button title = "No" color = {respuesta == 'no'? '#B29360' : '#BFBFBF'} onPress = {() => setRespuesta('no')}/>
					</View>
				</View>

				<View style={{height: 16}}/>

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

export default DetalleValoracion;