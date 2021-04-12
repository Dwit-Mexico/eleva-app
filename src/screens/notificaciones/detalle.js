import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator, Alert, Text, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import Request from '../../core/api';

// Componentes
import Container from '../../components/container';

// Styles
import Styles from '../../styles/screens/NotificacionesStyle';
import Colores from '../../styles/colores';

const request = new Request();

function Notificacion() {
	const [info, setInfo] = useState({});
	const [loading, setLoading] = useState(true);
	const [lista, setLista] = useState([]);

	const route = useRoute();
	const navigation = useNavigation();

	useEffect(() => {
		const { data } = route.params;
		if (data) {
			setInfo(data);
		}
	}, [route.params])

	return (
		<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1}}>
			<View style={Styles.backGround}>
				<Container>
					<ScrollView>
						<View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
							<Text style={Styles.detalle}>
								{info.Fecha? moment(info.Fecha).format('DD/MM/YYYY HH:mm') : ''}
							</Text>
							<View style={{height: 16}}></View>
							<Text style={Styles.detalle}>
								{info.Mensaje}
							</Text>
						</View>
					</ScrollView>
				</Container>
			</View>
		</ImageBackground>
	);
}

export default Notificacion;