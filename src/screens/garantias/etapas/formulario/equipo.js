import React, { useEffect, useRef } from 'react'
import { View, Animated, Text } from 'react-native'
import { Consumer } from '../../../../context'
import SelectEquipo from '../../../../components/select/SelectEquipo'
import { useLanguageContext } from '../../../../context/lang'

function SeleccionarEquipo({ equipo, setEquipo }) {
  const { i18n } = useLanguageContext()
  const animatedOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  function onSelect(opcion) {
    setEquipo(opcion)
  }

  return (
    <Animated.View
      className="flex-1 h-full"
      style={{
        opacity: animatedOpacity,
      }}
    >
      <View className="gap-4">
        <Text className="text-lg text-white text-center">{i18n.t('reports.equipment')}</Text>
        <View className="h-11/12">
          <SelectEquipo onSelect={onSelect} value={equipo} />
        </View>
      </View>
    </Animated.View>
  )
}

export default Consumer(SeleccionarEquipo)
