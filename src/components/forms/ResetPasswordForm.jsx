import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLanguageContext } from '../../context/lang'

export default function ResetPasswordForm({
  showPassword,
  onShowPasswordChange,
  showConfirmPassword,
  onShowConfirmPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isLoading,
  navigation,
  Email,
  OTP,
}) {
  const image = require('../../../assets/logo2.png')
  const { i18n, locale } = useLanguageContext()

  return (
    <>
      <View className="flex-1 items-center justify-center px-11 gap-4">
        <Image source={image} className="w-36 h-36" />
        <Text className="text-white text-center text-lg">{i18n.t('updatePassword.desciption')}</Text>
        <View className="flex-row items-center justify-content w-72 border-b border-white ">
          <TextInput
            key={`new-password-${locale}`}
            placeholder={i18n.t('updatePassword.password')}
            placeholderTextColor="#eaeaea"
            className="flex-1 text-white py-2"
            secureTextEntry={!showPassword}
            onChangeText={text => onNewPasswordChange(text)}
            returnKeyType="next"
          />
          <Pressable onPress={() => onShowPasswordChange(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#fff" />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-content w-72 border-b border-white ">
          <TextInput
            key={`confirm-password-${locale}`}
            placeholder={i18n.t('updatePassword.repassword')}
            placeholderTextColor="#eaeaea"
            className="flex-1 text-white py-2"
            secureTextEntry={!showConfirmPassword}
            onChangeText={text => onConfirmPasswordChange(text)}
            returnKeyType="done"
          />
          <Pressable onPress={() => onShowConfirmPasswordChange(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <View className="gap-2 bottom-4 px-11">
        <TouchableOpacity className="bg-[#B29360] w-full h-12 rounded items-center justify-center" onPress={onSubmit}>
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white align-center">{i18n.t('button.send')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#333138] w-full h-12 rounded items-center justify-center"
          onPress={() => navigation.navigate('verify-code', { Email, OTP })}
        >
          <Text className="text-white align-center">{i18n.t('button.back')}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
