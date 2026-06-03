import React, { useState, useEffect } from 'react'
import { Alert, View, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Request from '../../core/api'
import Container from '../../components/container'
import Lista from '../../components/documentos/Lista'
import Styles from '../../styles/screens/DocumentosStyle'
import { useLanguageContext } from '../../context/lang'
import Layout from '../../components/layout'

const request = new Request()

function ListaDocumentos({ navigation }) {
  const image = require('../../../assets/background.jpg')
  const { i18n } = useLanguageContext()
  const [lista, setLista] = useState([])
  const route = useRoute()

  async function getDocumentos() {
    const { data } = route.params

    if (!data) {
      Alert.alert(null, i18n.t('documents.error'))
      navigation.goBack()
      return
    }

    const response = await request.get('/app/documentos/get', {
      IdFolder: data.IdFolder,
    })

    if (response.error) {
      Alert.alert(null, i18n.t('documents.error3'))
    }

    if (Array.isArray(response.data)) {
      setLista(response.data)
    }
  }

  useEffect(() => {
    getDocumentos()
  }, [])

  async function reload() {
    getDocumentos()
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <Container>
          <Lista navigation={navigation} lista={lista} reload={reload.bind(this)} />
        </Container>
      </View>
    </Layout>
  )
}

export default ListaDocumentos
