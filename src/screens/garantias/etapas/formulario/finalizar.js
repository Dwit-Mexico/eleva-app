import React, { useEffect } from 'react'
import { View, Animated, Text } from 'react-native'
import { Consumer } from '../../../../context'
import BotonWizard from '../../../../components/boton/BotonWizard'
import Styles from '../../../../styles/components/WizardStyle'
import ButtonStyles from '../../../../styles/buttons'
import { useLanguageContext } from '../../../../context/lang'

function Finalizar({ aceptarAction, finalizarAction, loadingAceptar, loadingFinalizar }) {
  const { i18n } = useLanguageContext()
  let animatedOpacity = new Animated.Value(0)

  function initOpactity() {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    initOpactity()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 1,
          height: '100%',
          opacity: animatedOpacity,
        }}
      >
        <Text style={{ fontSize: 18, color: '#fff', padding: 10 }}>{i18n.t('reports.termns1')}</Text>
        <Text style={{ fontSize: 18, color: '#fff', padding: 10 }}>{i18n.t('reports.terms2')}</Text>
        <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 120 }}>
          <Text style={Styles.titleStyle}>{i18n.t('reports.newReport')}</Text>
          <View style={{ height: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 150 }}>
              <BotonWizard style={ButtonStyles.button} onPress={aceptarAction.bind(this)} loading={loadingAceptar}>
                <Text allowFontScaling={false} style={{ color: 'white', fontSize: 18 }}>
                  {i18n.t('button.accept')}
                </Text>
              </BotonWizard>
            </View>
            <Text>&nbsp;</Text>
            <View style={{ width: 150 }}>
              <BotonWizard style={ButtonStyles.button} onPress={finalizarAction.bind(this)} loading={loadingFinalizar}>
                <Text allowFontScaling={false} style={{ color: 'white', fontSize: 18 }}>
                  {i18n.t('button.finish')}
                </Text>
              </BotonWizard>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

export default Consumer(Finalizar)
