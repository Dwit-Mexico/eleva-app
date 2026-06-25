import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLanguageContext } from '../../context/lang'

export default function BottomSheet({ options, isVisible, onClose }) {
  const { i18n } = useLanguageContext()
  const insets = useSafeAreaInsets()

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="fade" transparent statusBarTranslucent={false}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

          <View
            style={[
              styles.bottomSheet,
              {
                paddingBottom: Math.max(insets.bottom, 30),
              },
            ]}
          >
            <Text style={styles.title}>{i18n.t('media.title')}</Text>

            <FlatList
              data={options || []}
              keyExtractor={(item, index) => String(item.id ?? index)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text style={styles.emptyText}>{i18n.t('select.emptyUnit')}</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={item.onPress}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
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
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#777',
  },
})
