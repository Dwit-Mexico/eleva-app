import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, Text, Pressable, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Consumer } from '../../../../context'
import SelectUnidad from '../../../../components/select/SelectUnidad'
import Styles from '../../../../styles/components/WizardStyle'
import { useLanguageContext } from '../../../../context/lang'

function SeleccionarUnidad({ unidad, setUnidad, context }) {
  const { i18n } = useLanguageContext()
  const animatedOpacity = useRef(new Animated.Value(0)).current
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  async function onRefresh() {
    if (context) {
      setIsLoading(true)
      await context.getSetUnidades()
      setIsLoading(false)
    }
  }

  function onSelect(opcion) {
    if (setUnidad) {
      setUnidad(opcion)
    }
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <View className="flex-1 ">
      <Animated.View
        style={{
          flex: 1,
          height: '100%',
          opacity: animatedOpacity,
        }}
      >
        <View className="gap-4">
          <View className="flex-row items-center justify-center">
            <Text className="text-lg text-white ">{i18n.t('reports.unit')}</Text>
            <Pressable
              className="absolute rounded-full w-10 h-10 justify-center items-center bg-[#B29360] right-0"
              onPress={onRefresh}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Ionicons name="reload" size={20} color="#ffffff" />
              )}
            </Pressable>
          </View>
          <SelectUnidad onSelect={onSelect.bind(this)} value={unidad} />
        </View>
      </Animated.View>
    </View>
  )
}

export default Consumer(SeleccionarUnidad)
