import { useEffect, useRef } from 'react'
import { ActivityIndicator, View, Animated, Text } from 'react-native'
import Styles from '../../../../styles/components/WizardStyle'
import { useLanguageContext } from '../../../../context/lang'
import MediaButton from '../../../../components/common/Buttons/MediaButton'
import BottomSheet from '../.././../../components/common/BottomSheet'
import ModalViewMedia from '../../../../components/common/Modals/ModalViewMedia'
import useMediaHandler from '../../../../hooks/useMediaHandler'

function SeleccionarFotos({ context }) {
  const { i18n } = useLanguageContext()
  const animatedOpacity = useRef(new Animated.Value(0)).current
  const {
    handleOpenCamera,
    handlePickMedia,
    openBottomSheet,
    isBottomSheetVisible,
    setBottomSheetVisible,
    mediaType,
    mediaIndex,
    showModalMedia,
    setShowModalMedia,
    handleEditMedia,
    thumbnail,
    isMediaProcessing,
  } = useMediaHandler(context)

  const mediaItems = [
    { id: 1, media: context.imagen1, type: 'image' },
    { id: 2, media: context.imagen2, type: 'image' },
    { id: 3, media: context.imagen3, type: 'image' },
    { id: 4, media: context.video1, type: 'video' },
  ]

  const options = [
    {
      label: mediaType === 'image' ? i18n.t('media.takeNewPhoto') : i18n.t('media.takeNewVideo'),
      onPress: handleOpenCamera,
    },
    {
      label: mediaType === 'image' ? i18n.t('media.selectImageFromDevice') : i18n.t('media.selectVideoFromDevice'),
      onPress: handlePickMedia,
    },
    {
      label: i18n.t('media.cancel'),
      onPress: () => setBottomSheetVisible(false),
    },
  ]

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
        <Text className="text-lg text-white text-center">{i18n.t('reports.photos')}</Text>
        <View className="flex-row flex-wrap gap-2 justify-center">
          {mediaItems.map((item, index) => (
            <MediaButton
              key={index}
              item={item}
              thumbnail={thumbnail}
              onOpen={() => openBottomSheet(item.type, item.id)}
            />
          ))}
        </View>
      </View>

      <ModalViewMedia
        isVisible={showModalMedia}
        onClose={() => setShowModalMedia(false)}
        type={mediaType}
        media={context[`imagen${mediaIndex}`] || context.video1}
        onEditMedia={() => handleEditMedia(mediaIndex)}
      />

      <BottomSheet
        options={options}
        isVisible={isBottomSheetVisible && !isMediaProcessing}
        onClose={() => {
          if (!isMediaProcessing) {
            setBottomSheetVisible(false)
          }
        }}
      />

      {isMediaProcessing && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <View
            style={{
              minWidth: 180,
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderRadius: 8,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#B29360" />
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                textAlign: 'center',
                color: '#333',
              }}
            >
              {i18n.t('documents.loading')}
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  )
}

export default SeleccionarFotos
