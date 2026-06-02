import React, { useEffect, useRef } from 'react'
import { View, Animated, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Consumer } from '../../../../context'
import { useLanguageContext } from '../../../../context/lang'

function Comentarios({ comentario, setComentario }) {
  const { i18n } = useLanguageContext()
  const animatedOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  function onChange(text) {
    setComentario(text)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View
        className="flex-1 h-full"
        style={{
          opacity: animatedOpacity,
        }}
      >
        <View className="gap-4">
          <Text className="text-lg text-white text-center">{i18n.t('reports.comment')}</Text>
          <TextInput
            value={comentario ?? ''}
            placeholder={i18n.t('reports.comments')}
            className="bg-white rounded p-4 h-3/5 w-full text-black text-base"
            multiline
            numberOfLines={8}
            maxLength={1500}
            onChangeText={onChange}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Consumer(Comentarios)
