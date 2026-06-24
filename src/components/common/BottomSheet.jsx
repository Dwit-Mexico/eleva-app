import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLanguageContext } from '../../context/lang'

export default function BottomSheet({ options, isVisible, onClose }) {
  const { i18n } = useLanguageContext()

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="fade" transparent statusBarTranslucent={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

          <View style={styles.bottomSheet}>
            <Text style={styles.title}>{i18n.t('media.title')}</Text>

            {options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={option.onPress}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  optionText: {
    fontSize: 14,
    color: '#333',
  },
})
