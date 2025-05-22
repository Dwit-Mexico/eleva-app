import {useState} from "react";
import {Alert, Platform, Linking} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import {useLanguageContext} from "../context/lang";

const useMediaHandler = (context) => {
  const {i18n} = useLanguageContext();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(null);
  const [showModalMedia, setShowModalMedia] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const verifyPermissions = async () => {
    // Verificar permisos de cámara
    if (!cameraPermission?.granted) {
      const {granted} = await requestCameraPermission();
      if (!granted) {
        return false;
      }
    }

    // Verificar permisos de biblioteca de medios (solo necesario para iOS 14+)
    if (Platform.OS === "ios" && !mediaLibraryPermission?.granted) {
      const {granted} = await requestMediaLibraryPermission();
      if (!granted) {
        return false;
      }
    }

    return true;
  };

  const handlePermissionDenied = () => {
    if (Platform.OS == "ios") {
      Alert.alert(i18n.t("permissions.title"), i18n.t("permissions.textIOS"), [
        {
          text: "Ir a configuración",
          onPress: () => Linking.openURL("app-settings:"),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert(i18n.t("permissions.title"), i18n.t("permissions.text"));
    }
  };

  const generateThumbnail = async (videoUri) => {
    try {
      const {uri} = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 15000,
      });
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleOpenCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      handlePermissionDenied();
      return;
    }

    if (mediaType === "image") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        context[`setImagen${mediaIndex}`](result?.assets[0].uri);
      }
    }

    if (mediaType === "video") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["videos"],
        aspect: [4, 3],
        quality: 0.5,
        videoMaxDuration: 8,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
      });

      if (!result.canceled) {
        const videoUri = result.assets[0].uri;
        context.setVideo1(videoUri);
        await generateThumbnail(videoUri);
      }
    }
    setMediaType(null);
    setBottomSheetVisible(false);
  };

  const handlePickMedia = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      handlePermissionDenied();
      return;
    }

    setBottomSheetVisible(false);

    if (mediaType === "image") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        context[`setImagen${mediaIndex}`](result?.assets[0].uri);
      }
    }

    if (mediaType === "video") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["videos"],
        aspect: [4, 3],
        quality: 0.5,
        videoMaxDuration: 8,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
      });

      if (!result.canceled) {
        const videoUri = result.assets[0].uri;
        context.setVideo1(videoUri);
        await generateThumbnail(videoUri);
      }
    }
    setMediaType(null);
  };

  const openBottomSheet = (type, index) => {
    if (context[`imagen${index}`] && type === "image") {
      setMediaType(type);
      setMediaIndex(index);
      setShowModalMedia(true);
      return;
    }

    if (context.video1 && type === "video") {
      setMediaType(type);
      setMediaIndex(index);
      setShowModalMedia(true);
      return;
    }

    setMediaType(type);
    setMediaIndex(index);
    setBottomSheetVisible(true);
  };

  const handleEditMedia = (index) => {
    if (mediaType === "image") {
      context[`setImagen${index}`](null);
    }

    if (mediaType === "video") {
      context.setVideo1(null);
    }
    setShowModalMedia(false);
    setBottomSheetVisible(true);
  };

  return {
    verifyPermissions,
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
    cameraPermission,
  };
};

export default useMediaHandler;
