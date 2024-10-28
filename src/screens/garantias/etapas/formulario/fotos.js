import React, {useEffect, useState} from "react";
import {Alert, View, Animated, Text, Platform, Linking} from "react-native";
import {Camera} from "expo-camera";
// import {Consumer} from "../../../../context";
// import {Feather} from "@expo/vector-icons";
// import ImageZoom from "react-native-image-zoom-viewer";
// import {useFocusEffect} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
// import {Video} from "expo-av";
import Styles from "../../../../styles/components/WizardStyle";
import {useLanguageContext} from "../../../../context/lang";
import MediaButton from "../../../../components/common/Buttons/MediaButton";
import BottomSheet from "../.././../../components/common/BottomSheet";

function SeleccionarFotos({navigation, context}) {
  const {i18n} = useLanguageContext();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(null);

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
    setBottomSheetVisible(false);
    await handlePermission();

    if (mediaTypes === "image") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        context[`setImagen${mediaIndex}`](result?.assets[0].uri);
      }
    }

    if (mediaTypes === "video") {
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

    setSelectedMediaId(null);
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
  };

  const openBottomSheet = (type, index) => {
    setMediaType(type);
    setMediaIndex(index);
    setBottomSheetVisible(true);
  };

  const mediaItems = [
    {id: 1, media: context.imagen1, type: "image"},
    {id: 2, media: context.imagen2, type: "image"},
    {id: 3, media: context.imagen3, type: "image"},
    {id: 4, media: context.video1, type: "video"},
  ];

  useEffect(() => {
    cameraPermissions();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={Styles.titleStyle}>{i18n.t("reports.photos")}</Text>
      <View style={{height: 8}} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {mediaItems.map((item, index) => (
          <MediaButton
            key={index}
            item={item}
            onOpen={() => openBottomSheet(item.type, item.id)}
          />
        ))}
      </View>

      <BottomSheet
        options={[
          {
            label:
              mediaType === "image"
                ? i18n.t("media.takeNewPhoto")
                : i18n.t("media.takeNewVideo"),
            onPress: () => handleOpenCamera(),
          },
          {
            label:
              mediaType === "image"
                ? i18n.t("media.selectImageFromDevice")
                : i18n.t("media.selectVideoFromDevice"),
            onPress: () => handlePickMedia(),
          },
          {
            label: i18n.t("media.cancel"),
            onPress: () => setBottomSheetVisible(false),
          },
        ]}
        isVisible={isBottomSheetVisible}
      />
    </View>
  );
}

export default SeleccionarFotos;
