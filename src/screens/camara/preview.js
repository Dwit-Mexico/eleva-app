import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Componentes
import Container from '../../components/container';

const Preview = (props) => {
	return (
		<Container>
			<View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 50, marginTop: 50}} />
			<View style={{flex: 1, justifyContent:'flex-end', alignItems: 'center'}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Image source={props.imagen} style={{flex: 1}} resizeMode='contain'/>
				</View>
				<View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<View style={{ width: 50 }}>
							<TouchableOpacity onPress={() => props.cancelarFoto()}>
								<FontAwesome5 name="times" size={35} color="red" />
							</TouchableOpacity>
						</View>
						<View style={{ width: 50 }}>
							<TouchableOpacity onPress={() => props.aceptarFotos()}>
								<FontAwesome5 name="check" size={35} color="green" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Container>
	)
}

export default Preview;