import React from 'react'
import { View, ImageBackground } from 'react-native'
import Container from '../../components/container'
import ListaEtapas from '../../components/lista-etapas'

import Styles from '../../styles/screens/GarantiasStyle'

function Etapas({ navigation }) {
  return (
    <ImageBackground source={require('../../../assets/background.jpg')} style={{ flex: 1 }}>
      <View style={Styles.backGround}>
        <Container>
          <ListaEtapas navigation={navigation} />
        </Container>
      </View>
    </ImageBackground>
  )
}

export default Etapas
