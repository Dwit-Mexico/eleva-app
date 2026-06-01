import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import Wizard from './etapas/Wizard'
import Layout from '../../components/layout'

function NuevaGarantia({ navigation }) {
  const image = require('../../../assets/background.jpg')

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <View className="flex-1 p-4">
          <Wizard navigation={navigation} esDetalle={false} />
        </View>
      </View>
    </Layout>
  )
}

export default NuevaGarantia
