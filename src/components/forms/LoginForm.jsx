import React, { useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useLanguageContext } from '../../context/lang'

export default function LoginForm({ formData, setFormData, handleSubmit, loading, showPassword, setShowPassword }) {
  const { locale, i18n } = useLanguageContext()
  const navigation = useNavigation()
  const logo = require('../../../assets/logo2.png')
  const passwordRef = useRef(null)

  return (
    <View className="flex-1 items-center justify-center px-11 gap-4">
      <Image source={logo} className="w-36 h-36" />
      <Text className=" text-xl text-white align-center">{i18n.t('login.title')}</Text>

      <TextInput
        key={`email-${locale}`}
        placeholder={i18n.t('login.email')}
        placeholderTextColor="#eaeaea"
        className="border-b border-white w-72 text-white py-2"
        onSubmitEditing={() => passwordRef.current.focus()}
        returnKeyType="next"
        onChangeText={text => setFormData({ ...formData, email: text })}
      />
      <View className="flex-row items-center justify-content w-72 border-b border-white ">
        <TextInput
          key={`password-${locale}`}
          placeholder={i18n.t('login.password')}
          placeholderTextColor="#eaeaea"
          className="flex-1 text-white py-2"
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

      <TouchableOpacity onPress={handleSubmit} className="bg-[#B29360] w-72 h-12 rounded items-center justify-center">
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white align-center text-base">{i18n.t('button.start')}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('recover-password', {
            usuario: formData.email,
          })
        }
      >
        <Text className="text-white underline align-center">{i18n.t('login.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )
}
