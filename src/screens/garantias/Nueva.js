import React from 'react';
import { View, ImageBackground } from 'react-native';

//Wizard
import Wizard from './etapas/Wizard';

//Componentes
import Container from '../../components/container';

//Styles
import Styles from '../../styles/screens/GarantiasStyle';

function NuevaGarantia({navigation}) {

	const Etapa = () => {
		return <Wizard navigation={navigation} esDetalle={false}/>
	}

	return (
		<ImageBackground source={require('../../../assets/background.jpg')} style={{flex: 1}}>
			<View style={Styles.backGround}>
				<Container>
					<Etapa />
				</Container>
			</View>
		</ImageBackground>
	);
}

export default NuevaGarantia;