import React, {useState} from "react";
import {Alert, Platform, Linking} from "react-native";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {useLanguageContext} from "../context/lang";

const useMediaHandler = (context) => {
  const {i18n} = useLanguageContext();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(null);
  const [showModalMedia, setShowModalMedia] = useState(false);

  const cameraPermissions = async () => {
    const {status: existingStatus} =
      await Camera.requestCameraPermissionsAsync();
    if (existingStatus !== "granted") {
      await Camera.requestCameraPermissionsAsync();
    }
  };

  const handlePermission = async () => {
    const permissions = await Camera.requestCameraPermissionsAsync();

    if (permissions.status === "denied") {
      if (permissions.canAskAgain) {
        Alert.alert(i18n.t("permissions.title"), i18n.t("permissions.text"));
      } else {
        if (Platform.OS == "ios") {
          Alert.alert(
            i18n.t("permissions.title"),
            i18n.t("permissions.textIOS"),
            [
              {
                text: "ir a configuración",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
        } else {
          Alert.alert(
            i18n.t("permissions.title"),
            i18n.t("permissions.textIOS")
          );
        }
      }
      return;
    }
  };

  const handleOpenCamera = async () => {
    await handlePermission();

    if (mediaType === "image") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        context[`setImagen${mediaIndex}`](result?.assets[0].uri);
      }
    }

    if (mediaType === "video") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 0.5,
        videoMaxDuration: 8,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
      });

      if (!result.canceled) {
        context.setVideo1(result?.assets[0].uri);
      }
    }
    setMediaType(null);
    setBottomSheetVisible(false);
  };

  handlePickMedia = async () => {
    setBottomSheetVisible(false);

    if (mediaType === "image") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        context[`setImagen${mediaIndex}`](result?.assets[0].uri);
      }
    }

    if (mediaType === "video") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 0.5,
        videoMaxDuration: 8,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
      });

      if (!result.canceled) {
        context.setVideo1(result?.assets[0].uri);
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
    cameraPermissions,
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
  };
};

export default useMediaHandler;
