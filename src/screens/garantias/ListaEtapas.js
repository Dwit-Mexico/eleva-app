import React from 'react'
import { View, ImageBackground } from 'react-native'
import Container from '../../components/container'
import ListaEtapas from '../../components/lista-etapas'

import Styles from '../../styles/screens/GarantiasStyle'
import Layout from '../../components/layout'

function Etapas({ navigation }) {
  const image = require('../../../assets/background.jpg')
  return (
    <ImageBackground source={image} resizeMode="cover" className="flex-1">
      <View className="flex-1 bg-[#000000A1]">
        <ListaEtapas navigation={navigation} />
      </View>
    </ImageBackground>
  )
}

export default Etapas
