import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import InputStyles from '../../styles/inputs'
import { useLanguageContext } from '../../context/lang'

function SelectUnidad({ unidades, value, onChange }) {
  const { i18n } = useLanguageContext()
  const insets = useSafeAreaInsets()
  const [isVisible, setIsVisible] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const selected = unidades?.find(item => item.id === value)
  const tempSelected = unidades?.find(item => item.id === tempValue)

  function openModal() {
    setTempValue(value)
    setIsVisible(true)
  }

  function cancelar() {
    setTempValue(value)
    setIsVisible(false)
  }

  function aceptar() {
    onChange?.(tempValue)
    setIsVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openModal}
        style={[
          InputStyles.Select,
          {
            height: 50,
            paddingHorizontal: 12,
            justifyContent: 'center',
          },
        ]}
      >
        <View style={styles.selectContent}>
          <Text style={[styles.selectText, { color: selected ? '#000' : '#777' }]}>
            {selected ? selected.name : i18n.t('select.selectUnit')}
          </Text>

          <AntDesign name="caret-down" color="grey" size={10} />
        </View>
      </TouchableOpacity>

      <Modal visible={isVisible} onRequestClose={cancelar} animationType="fade" transparent statusBarTranslucent>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={cancelar} />

            <View
              style={[
                styles.bottomSheet,
                {
                  paddingBottom: Math.max(insets.bottom, 30),
                },
              ]}
            >
              <Text style={styles.title}>{i18n.t('select.unit')}</Text>

              <FlatList
                data={unidades || []}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyText}>{i18n.t('select.emptyUnit')}</Text>}
                renderItem={({ item }) => {
                  const isSelected = item.id === tempValue

                  return (
                    <TouchableOpacity
                      style={[styles.option, isSelected && styles.optionSelected]}
                      onPress={() => setTempValue(item.id)}
                    >
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                }}
              />

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancelButton} onPress={cancelar}>
                  <Text style={styles.cancelText}>{i18n.t('button.cancel')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.acceptButton} onPress={aceptar}>
                  <Text style={styles.acceptText}>{i18n.t('button.accept')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    flex: 1,
    fontSize: 14,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    maxHeight: '45%',
  },
  title: {
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#7B7F8E',
  },
  option: {
    paddingVertical: 10,
  },
  optionSelected: {
    backgroundColor: '#F3EFE7',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: '#B29360',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#777',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  acceptButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 8,
  },
  cancelText: {
    color: '#7B7F8E',
    fontWeight: '600',
  },
  acceptText: {
    color: '#B29360',
    fontWeight: '600',
  },
})

export default SelectUnidad
