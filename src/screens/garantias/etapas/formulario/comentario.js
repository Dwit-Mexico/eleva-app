import React, { useEffect } from 'react';
import { View, Animated, Text, TextInput } from 'react-native';
import { Consumer } from '../../../../context';

//Componentes
import SelectArea from '../../../../components/select/SelectArea';

function Comentarios(props) {
	const animatedOpacity = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(animatedOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	return (
		<View style={{flex: 1}}>
			<Animated.View
				style={{
					flex: 1,
					height: '100%',
					opacity: animatedOpacity,
					// backgroundColor: 'lightgray',
				}}
			>
				<Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>¿Tienes algún comentario?</Text>

				<View style={{height: 8}}/>

				<TextInput
					placeholder="Escriba sus comentarios"
					style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 14}}
					multiline
					numberOfLines={6}
					maxLength={1500}
					onChangeText = {(text) => setForm({...form, comentarios: text})}/>
			</Animated.View>
		</View>
	)
}

export default Consumer(Comentarios);