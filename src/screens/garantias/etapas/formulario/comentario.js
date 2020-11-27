import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectArea from '../../../../components/select/SelectArea';
import { onChange } from 'react-native-reanimated';

function Comentarios(props) {
	const animatedOpacity = useRef(new Animated.Value(0)).current;

	const [comentario, setComentario] = useState('');

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	function onChange(text) {
		setComentario(text);
		if (props.setComentario) {
			props.setComentario(text);
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{flex: 1}}>
				<Animated.View
					style={{
						flex: 1,
						height: '100%',
						opacity: animatedOpacity,
						// backgroundColor: 'lightgray',
					}}
				>
					<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>Describe tu detalle</Text>

					<View style={{height: 8}}/>

					<TextInput
						value 			= {props.comentario || comentario}
						placeholder		= "Escriba sus comentarios"
						style			= {{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14, minHeight: 100}}
						multiline
						numberOfLines	= {6}
						maxLength		= {1500}
						onChangeText 	= {onChange.bind(this)}/>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Consumer(Comentarios);