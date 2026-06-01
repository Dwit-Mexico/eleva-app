import React, { useState } from 'react'
import { Alert, View, ImageBackground } from 'react-native'

import { useLanguageContext } from '../../context/lang'

import Layout from '../../components/layout'
import Form from '../../components/forms/RecoverPasswordForm'

import Request from '../../core/api'
const request = new Request()

export default function RecoverPassword({ navigation }) {
  const image = require('../../../assets/background.jpg')
  const { locale } = useLanguageContext()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  async function handleSubmit() {
    setLoading(true)

    if (!email) {
      Alert.alert(null, locale === 'es' ? 'Por favor ingrese un correo válido.' : 'Please enter a valid email.')
      setLoading(false)
      return
    }

    const data = {
      Email: email,
    }

    try {
      const response = await request.post('/app/users/recovery/password', data)

      if (response.error) {
        Alert.alert(null, locale === 'es' ? response.message.es : response.message.en)
      } else if (response.sended) {
        Alert.alert(null, locale === 'es' ? response.message.es : response.message.en)
        navigation.navigate('verify-code', { Email: email })
      } else {
        Alert.alert(null, locale === 'es' ? response.message.es : response.message.en)
      }
    } catch (error) {
      Alert.alert(null, error.message.es)
    }

    setLoading(false)
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <Form
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
          loading={loading}
          navigation={navigation}
          Email={email}
        />
      </View>
    </Layout>
  )
}
