import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLanguageContext } from '../../context/lang'

export default function VerifyCodeForm({ code, onCodeChange, onSubmit, isLoading, inputRefs, navigation, Email }) {
  const image = require('../../../assets/logo2.png')
  const { i18n } = useLanguageContext()

  return (
    <>
      <View className="flex-1 items-center justify-center px-11 gap-4">
        <Image source={image} className="w-36 h-36" />
        <Text className="text-white text-center text-lg">{i18n.t('verifyCode.description')}</Text>
        <View className="flex-row items-center justify-center justify-content gap-1 w-full px-11">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              placeholder=""
              placeholderTextColor="#eeeeee"
              value={digit}
              onChangeText={text => onCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={el => (inputRefs.current[index] = el)}
              className="border-b border-white text-white text-center align-center text-xl w-12 h-12"
            />
          ))}
        </View>
      </View>

      <View className="gap-2 bottom-4 px-11">
        <TouchableOpacity className="bg-[#B29360] w-full h-12 rounded items-center justify-center" onPress={onSubmit}>
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white align-center">{i18n.t('verifyCode.button')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#333138] w-full h-12 rounded items-center justify-center"
          onPress={() => navigation.navigate('recover-password', { Email })}
        >
          <Text className="text-white align-center">{i18n.t('button.back')}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
