import React, { useState, useRef } from 'react'
import { Alert, View, ImageBackground } from 'react-native'

import { useLanguageContext } from '../../context/lang'

import Layout from '../../components/layout'
import Form from '../../components/forms/VerifyCodeForm'

import Request from '../../core/api'
const request = new Request()

export default function VerifyCode({ navigation, route }) {
  const image = require('../../../assets/background.jpg')
  const { locale } = useLanguageContext()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const { Email } = route.params
  const inputRefs = useRef([])

  const handleChangeText = (text, index) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1)
    }

    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const OTP = code.join('')

    if (OTP.length !== 6) {
      Alert.alert(null, locale === 'es' ? 'Por favor ingrese el código completo.' : 'Please enter the complete code.')
      setIsLoading(false)
      return
    }

    const data = {
      Email,
      OTP,
    }

    try {
      const response = await request.post('/app/users/validate/otp', data)

      if (response.isValid) {
        Alert.alert(null, locale === 'es' ? response.message.es : response.message.en)
        navigation.navigate('reset-password', { Email, OTP })
      } else {
        Alert.alert(null, locale === 'es' ? response.message.es : response.message.en)
      }
    } catch (error) {
      Alert.alert(null, error.message)
    }

    setIsLoading(false)
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <Form
          code={code}
          onCodeChange={handleChangeText}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          inputRefs={inputRefs}
          navigation={navigation}
          Email={Email}
        />
      </View>
    </Layout>
  )
}
