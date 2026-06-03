import React, { useEffect, useRef } from 'react'
import { View, Animated, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Consumer } from '../../../../context'
import { useLanguageContext } from '../../../../context/lang'

function Finalizar({ aceptarAction, finalizarAction, loadingAceptar, loadingFinalizar }) {
  const { i18n } = useLanguageContext()
  const animatedOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      className="flex-1 h-full"
      style={{
        opacity: animatedOpacity,
      }}
    >
      <View className="gap-4">
        <Text className="text-lg text-white">{i18n.t('reports.termns1')}</Text>
        <Text className="text-lg text-white">{i18n.t('reports.terms2')}</Text>
        <Text className="text-lg text-white text-center">{i18n.t('reports.newReport')}</Text>
        <View className="flex-row items-center w-full justify-between gap-2">
          <TouchableOpacity
            onPress={aceptarAction}
            className="bg-[#B29360] flex-1 h-12 rounded items-center justify-center"
          >
            {loadingAceptar ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center text-base">{i18n.t('button.accept')}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={finalizarAction}
            className="bg-[#B29360] flex-1 h-12 rounded items-center justify-center"
          >
            {loadingFinalizar ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center text-base">{i18n.t('button.finish')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default Consumer(Finalizar)
