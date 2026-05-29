import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLanguageContext } from '../../context/lang'
import styles from '../../styles/screens/RecoverPassword'

export default function RecoverPasswordForm({ onEmailChange, onSubmit, loading, navigation }) {
  const image = require('../../../assets/logo2.png')
  const { i18n } = useLanguageContext()

  return (
    <>
      <View className="flex-1 items-center justify-center px-11 gap-4">
        <Image source={image} className="w-36 h-36" />
        <Text className="text-white text-center text-lg">{i18n.t('recoverPassword.description')}</Text>
        <TextInput
          placeholder={i18n.t('recoverPassword.email')}
          placeholderTextColor="#eaeaea"
          className="border-b border-white w-full text-white py-2"
          returnKeyType="go"
          onChangeText={text => onEmailChange(text)}
        />
      </View>

      <View className="gap-2 bottom-4 px-11">
        <TouchableOpacity className="bg-[#B29360] w-full h-12 rounded items-center justify-center" onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text className="text-white align-center">{i18n.t('recoverPassword.button')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#333138] w-full h-12 rounded items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white align-center">{i18n.t('button.back')}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
