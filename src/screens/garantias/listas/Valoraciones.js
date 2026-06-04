import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Consumer } from '../../../context'
import Container from '../../../components/container'
import ListaGarantias from '../../../components/lista-garantias-detalle'
import Styles from '../../../styles/screens/GarantiasStyle'
import Colores from '../../../styles/colores'
import { useLanguageContext } from '../../../context/lang'
import Layout from '../../../components/layout'

const ListaValoraciones = ({ navigation, context }) => {
  const image = require('../../../../assets/background2.jpg')
  const { i18n } = useLanguageContext()
  const [lista, setLista] = useState([])

  if (context) {
    useEffect(() => {
      let reportes = context.reportes

      if (Array.isArray(reportes)) {
        reportes = reportes.filter(r => r.IdEstado == 8)
        setLista(reportes)
      }
    }, [context.reportes])
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <View className="p-4 gap-2">
          <Text className="text-lg text-white">{i18n.t('ratings.text')}</Text>
          <Text className="text-lg text-white">{i18n.t('ratings.thanks')}</Text>
        </View>
        <ListaGarantias navigation={navigation} lista={lista} etapa={3} />
      </View>
    </Layout>
  )
}

export default Consumer(ListaValoraciones)
