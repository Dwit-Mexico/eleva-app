import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview'
import Styles from '../../styles/screens/DocumentosStyle'
import Colores from '../../styles/colores'
import { Platform } from 'react-native-web'
import { useLanguageContext } from '../../context/lang'
import Layout from '../../components/layout'
import Constants from 'expo-constants'

function Documento() {
  const image = require('../../../assets/background.jpg')
  const { i18n } = useLanguageContext()
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')
  const route = useRoute()

  if (route.params) {
    useEffect(() => {
      const { data } = route.params
      if (data) {
        const pdfUri =
          Platform.OS === 'ios' ? data.path : `https://docs.google.com/gview?embedded=true&url=${data.path}`
        setUrl(pdfUri)
      }
    }, [route.params])
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <WebView source={{ uri: url }} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} />

        {loading && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
          >
            <ActivityIndicator size="large" />
            <Text>{i18n.t('documents.loading')}</Text>
          </View>
        )}
      </View>
    </Layout>
  )
}

export default Documento
