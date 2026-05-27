import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Boton from '../boton/BotonAccion'
import LoginStyle from '../../styles/screens/LoginStyle'
import TextStyle from '../../styles/text'
import InputStyles from '../../styles/inputs'
import { useLanguageContext } from '../../context/lang'

export default function LoginForm(
  formData,
  setFormData,
  handleSubmit,
  loading,
  showPassword,
  setShowPassword,
  passwordRef,
) {
  const { locale, i18n } = useLanguageContext()
  const navigation = useNavigation()
  const logo = require('../../../assets/logo2.png')

  return (
    <View style={LoginStyle.loginView}>
      <Image source={logo} style={{ width: 140, height: 140 }} />
      <Text style={TextStyle.LoginTitle}>{i18n.t('login.title')}</Text>
      <TextInput
        key={`email-${locale}`}
        placeholder={i18n.t('login.email')}
        placeholderTextColor="#eaeaea"
        style={InputStyles.LoginUsername}
        onSubmitEditing={() => passwordRef.current.focus()}
        returnKeyType="next"
        onChangeText={text => setFormData({ ...formData, email: text })}
      />
      <View style={InputStyles.LoginPassword}>
        <TextInput
          key={`password-${locale}`}
          placeholder={i18n.t('login.password')}
          placeholderTextColor="#eaeaea"
          style={{ color: '#fff', flex: 1 }}
          ref={passwordRef}
          secureTextEntry={!showPassword}
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
          onChangeText={text => setFormData({ ...formData, password: text })}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#fff" />
        </Pressable>
      </View>
      <Boton onPress={handleSubmit} loading={loading}>
        <Text style={TextStyle.loginButton}>{i18n.t('button.start')}</Text>
      </Boton>
      <View style={{ height: 16 }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('recover-password', {
            usuario: formData.email,
          })
        }
      >
        <Text style={TextStyle.forgotPassword}>{i18n.t('login.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )
}
