import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Consumer } from '../../context'
import Boton from '../../components/boton/BotonAccion'
import LoginStyle from '../../styles/screens/LoginStyle'
import TextStyle from '../../styles/text'
import InputStyles from '../../styles/inputs'
import { useLanguageContext } from '../../context/lang'
import Layout from '../../components/layout'
import LoginForm from '../../components/forms/LoginForm'

function LoginScreen(props) {
  const { locale, i18n, setLocale } = useLanguageContext()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const passwordRef = useRef(null)

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
      <View style={styles.overlay}>
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
          passwordRef={passwordRef}
        />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000A1',
  },
})

export default Consumer(LoginScreen)
