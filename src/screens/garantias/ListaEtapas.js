import React, { useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { Notifications } from 'expo';

// Componentes
import Container from '../../components/container';
import ListaEtapas from '../../components/lista-etapas';

// Styles
import Styles from '../../styles/screens/GarantiasStyle';

function Etapas({navigation}) {

	function goNotifications(screen) {
		navigation.navigate(screen);
	}

	useEffect(() => {
		Notifications.addListener((event) => {
			console.log(event);
			const { data, origin } = event;
			if (origin == 'selected' && data.screen) {
				goNotifications(data.screen);
			}
		});
	}, []);

	return (
		<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1}}>
			<View style={Styles.backGround}>
				<Container>
					<ListaEtapas navigation={navigation}/>
				</Container>
			</View>
		</ImageBackground>
	);
}

export default Etapas;