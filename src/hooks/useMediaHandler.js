import { useState } from 'react'
import { Alert, Platform, Linking } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { createVideoPlayer } from 'expo-video'
import { useLanguageContext } from '../context/lang'

const useMediaHandler = context => {
  const { i18n } = useLanguageContext()
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [mediaType, setMediaType] = useState(null)
  const [mediaIndex, setMediaIndex] = useState(null)
  const [showModalMedia, setShowModalMedia] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)
  const [isMediaProcessing, setIsMediaProcessing] = useState(false)
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions()

  const verifyCameraPermissions = async () => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestCameraPermission()
      if (!granted) {
        return false
      }
    }

    return true
  }

  const closeBottomSheetBeforePicker = () => {
    setBottomSheetVisible(false)

    return new Promise(resolve => {
      setTimeout(resolve, 250)
    })
  }

  const handlePermissionDenied = () => {
    if (Platform.OS == 'ios') {
      Alert.alert(i18n.t('permissions.title'), i18n.t('permissions.textIOS'), [
        {
          text: 'Ir a configuración',
          onPress: () => Linking.openURL('app-settings:'),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ])
    } else {
      Alert.alert(i18n.t('permissions.title'), i18n.t('permissions.text'))
    }
  }

  const generateThumbnail = async videoUri => {
    const player = createVideoPlayer(videoUri)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const thumbnails = await player.generateThumbnailsAsync(1)

      setThumbnail(thumbnails[0] || null)
    } catch (e) {
      console.warn(e)
    } finally {
      player.release()
    }
  }

  const handleOpenCamera = async () => {
    if (isMediaProcessing) {
      return
    }

    const hasPermission = await verifyCameraPermissions()
    if (!hasPermission) {
      handlePermissionDenied()
      return
    }

    setIsMediaProcessing(true)

    try {
      await closeBottomSheetBeforePicker()

      if (mediaType === 'image') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.canceled) {
          context[`setImagen${mediaIndex}`](result?.assets[0].uri)
        }
      }

      if (mediaType === 'video') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['videos'],
          aspect: [4, 3],
          quality: 0.5,
          videoMaxDuration: 8,
          videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
        })

        if (!result.canceled) {
          const videoUri = result.assets[0].uri
          context.setVideo1(videoUri)
          await generateThumbnail(videoUri)
        }
      }
    } finally {
      setMediaType(null)
      setIsMediaProcessing(false)
    }
  }

  const handlePickMedia = async () => {
    if (isMediaProcessing) {
      return
    }

    setIsMediaProcessing(true)

    try {
      await closeBottomSheetBeforePicker()

      if (mediaType === 'image') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.canceled) {
          context[`setImagen${mediaIndex}`](result?.assets[0].uri)
        }
      }

      if (mediaType === 'video') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['videos'],
          aspect: [4, 3],
          quality: 0.5,
          videoMaxDuration: 8,
          videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
        })

        if (!result.canceled) {
          const videoUri = result.assets[0].uri
          context.setVideo1(videoUri)
          await generateThumbnail(videoUri)
        }
      }
    } finally {
      setMediaType(null)
      setIsMediaProcessing(false)
    }
  }

  const openBottomSheet = (type, index) => {
    if (isMediaProcessing) {
      return
    }

    if (context[`imagen${index}`] && type === 'image') {
      setMediaType(type)
      setMediaIndex(index)
      setShowModalMedia(true)
      return
    }

    if (context.video1 && type === 'video') {
      setMediaType(type)
      setMediaIndex(index)
      setShowModalMedia(true)
      return
    }

    setMediaType(type)
    setMediaIndex(index)
    setBottomSheetVisible(true)
  }

  const handleEditMedia = index => {
    if (isMediaProcessing) {
      return
    }

    setMediaIndex(index)

    if (mediaType === 'image') {
      context[`setImagen${index}`](null)
    }

    if (mediaType === 'video') {
      context.setVideo1(null)
    }
    setShowModalMedia(false)
    setBottomSheetVisible(true)
  }

  return {
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
  }
}

export default useMediaHandler
