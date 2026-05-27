import React, { useState } from 'react'
import { Alert, View, Text, Pressable } from 'react-native'
import { Consumer } from '../../context'
import { useLanguageContext } from '../../context/lang'
import Layout from '../../components/layout'
import LoginForm from '../../components/forms/LoginForm'
import Boton from '../../components/boton/BotonAccion'
import LoginStyle from '../../styles/screens/LoginStyle'

function LoginScreen(props) {
  const { locale, i18n, setLocale } = useLanguageContext()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    setLoading(true)
    const { email, password } = formData
    if (!email) {
      Alert.alert(null, i18n.t('login.invalidEmail'))
      setLoading(false)
      return
    }
    if (!password) {
      Alert.alert(null, i18n.t('login.invalidPassword'))
      setLoading(false)
      return
    }
    const { context } = props
    if (context) {
      const validar = await context.validar(email, password)
      if (validar.activar) {
        props.navigation.navigate('ActualizarPassword', {
          username: email,
          IdPersona: validar.IdPersona,
        })
        return
      }
      await context.login(email, password, locale)
    }
    setLoading(false)
  }

  const image = require('../../../assets/background.jpg')

  return (
    <Layout backgroundImage={image}>
      <View style={LoginStyle.overlay}>
        <View style={LoginStyle.languageContainer}>
          <Pressable style={LoginStyle.languageButton} onPress={() => setLocale(locale === 'es' ? 'en' : 'es')}>
            {locale === 'es' ? <Text>ES</Text> : <Text>EN</Text>}
          </Pressable>
        </View>
        <LoginForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </View>
    </Layout>
  )
}

export default Consumer(LoginScreen)
