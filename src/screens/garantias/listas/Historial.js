import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Pressable, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Consumer } from '../../../context'
import ListaGarantias from '../../../components/lista-garantias-detalle'
import Styles from '../../../styles/screens/GarantiasStyle'
import { useLanguageContext } from '../../../context/lang'
import Layout from '../../../components/layout'

const Historial = ({ navigation, context }) => {
  const image = require('../../../../assets/background2.jpg')
  const { locale } = useLanguageContext()
  const translate = locale === 'en'
  const [lista, setLista] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function onRefresh() {
    if (context) {
      setIsLoading(true)
      await context.reloadReportes(translate)
      setIsLoading(false)
    }
  }

  if (context) {
    useEffect(() => {
      let reportes = context.reportes

      if (Array.isArray(reportes)) {
        reportes = reportes.filter(r => r.IdEstado == 9 || r.IdEstado == 3)
        setLista(reportes)
      }
    }, [context.reportes])
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <View className="gap-2 p-4">
          <ListaGarantias navigation={navigation} lista={lista} etapa={4} />
        </View>
        <Pressable
          className="absolute rounded-full w-12 h-12 justify-center items-center bg-[#B29360] right-4 bottom-4"
          onPress={onRefresh}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Ionicons name="reload" size={24} color="#ffffff" />
          )}
        </Pressable>
      </View>
    </Layout>
  )
}

export default Consumer(Historial)
