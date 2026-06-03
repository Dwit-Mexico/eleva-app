import React, { useEffect, useState } from 'react'
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Consumer } from '../../context'
import { useLanguageContext } from '../../context/lang'

const Wizard = ({ context, steps, ultimo, onSubmit, loading, terminado }) => {
  const { i18n } = useLanguageContext()
  const [page, setPage] = useState(1)
  const [totalSteps, setTotalSteps] = useState(0)

  function prevStep() {
    if (page > 1) {
      context.setStep(page - 1)
    }
  }

  function nextStep() {
    if (page == 1 && !context.unidad) {
      Alert.alert(null, i18n.t('reports.selectUnit'))
      return
    }
    if (page == 2 && !context.area) {
      Alert.alert(null, i18n.t('reports.selectArea'))
      return
    }
    if (page == 3 && !context.equipo) {
      Alert.alert(null, i18n.t('reports.selectEquipment'))
      return
    }
    if (page == 4 && !context.problema) {
      Alert.alert(null, i18n.t('reports.selectProblem'))
      return
    }

    if (page < totalSteps && context) {
      context.setStep(page + 1)
    }
  }

  useEffect(() => {
    const propSteps = steps
    if (Array.isArray(propSteps)) {
      setTotalSteps(propSteps.length)
    }
  }, [steps])

  if (context) {
    useEffect(() => {
      setPage(context.step)
    }, [context.step])
  }

  useEffect(() => {
    if (terminado) {
      context.setStep(steps.length)
    }
  }, [terminado])

  return (
    <View className="flex-1 flex-col">
      {steps[page - 1]}

      {!terminado && (
        <View className={`flex-row items-center w-full ${page == 1 ? 'justify-end' : 'justify-between'}`}>
          {page !== 1 && (
            <TouchableOpacity
              onPress={prevStep.bind(this)}
              className="bg-black w-28 h-12 rounded items-center justify-center"
            >
              <Text allowFontScaling={false} className="text-white text-center text-base">
                {i18n.t('button.back')}
              </Text>
            </TouchableOpacity>
          )}
          {page == ultimo ? (
            <TouchableOpacity onPress={onSubmit} className="bg-[#B29360] w-28 h-12 rounded items-center justify-center">
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text allowFontScaling={false} className="text-white text-center text-base">
                  {i18n.t('button.send')}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#B29360] w-28 h-12 rounded items-center justify-center"
              onPress={nextStep.bind(this)}
            >
              <Text allowFontScaling={false} className="text-white text-center text-base">
                {i18n.t('button.next')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

export default Consumer(Wizard)
