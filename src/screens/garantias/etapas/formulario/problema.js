import React, { useEffect, useRef } from 'react'
import { View, Animated, Text } from 'react-native'
import { Consumer } from '../../../../context'
import SelectProblema from '../../../../components/select/SelectProblema'
import Styles from '../../../../styles/components/WizardStyle'
import { useLanguageContext } from '../../../../context/lang'

function SeleccionarProblema({ problema, setProblema }) {
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
    setProblema(opcion)
  }

  return (
    <Animated.View
      className="flex-1 h-full"
      style={{
        opacity: animatedOpacity,
      }}
    >
      <View className="gap-4">
        <Text className="text-lg text-white text-center">{i18n.t('reports.problem')}</Text>
        <View className="h-11/12">
          <SelectProblema onSelect={onSelect} value={problema} />
        </View>
      </View>
    </Animated.View>
  )
}

export default Consumer(SeleccionarProblema)
