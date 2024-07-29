import React, {useEffect, useState, useCallback, useRef} from "react";
import {
   Alert,
   View,
   Animated,
   Text,
   TouchableOpacity,
   Modal,
   Image,
   Platform,
   Linking,
} from "react-native";
import {Camera} from "expo-camera";
import {Consumer} from "../../../../context";
import {FontAwesome5} from "@expo/vector-icons";
import ImageZoom from "react-native-image-zoom-viewer";
import {useFocusEffect} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {Video} from "expo-av";
import Styles from "../../../../styles/components/WizardStyle";
import {useLanguageContext} from "../../../../context/lang";
const emptyImage = require("../../../../../assets/picture.jpg");
const emptyVideo = require("../../../../../assets/video1.jpeg");

function SeleccionarFotos({navigation, imagenes, videos, context}) {
   const {i18n} = useLanguageContext();
   let animatedOpacity = useRef(new Animated.Value(0)).current;

   const [imagen1, setImagen1] = useState(imagenes.imagen1 || null);
   const [imagen2, setImagen2] = useState(imagenes.imagen2 || null);
   const [imagen3, setImagen3] = useState(imagenes.imagen3 || null);
   const [video1, setVideo1] = useState(videos.video1 || null);
   const [imagenIndex, setimagenIndex] = useState(null);
   const [videoIndex, setVideoIndex] = useState(null);
   const [modalImagen, setModalImagen] = useState(false);
   const [modalVideo, setModalVideo] = useState(false);
   const [zoomImagen, setZoomImagen] = useState(null);

   function initOpactity() {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();
   }

   useFocusEffect(
      useCallback(() => {
         initOpactity();

         if (context.imagen1) {
            setImagen1(context.imagen1);
         }

         if (context.imagen2) {
            setImagen2(context.imagen2);
         }

         if (context.imagen3) {
            setImagen3(context.imagen3);
         }

         if (context.video1) {
            setVideo1(context.video1);
         }
      }, [])
   );

   useEffect(() => {
      async function permisoCamara() {
         const {status: existingStatus} =
            await Camera.requestCameraPermissionsAsync();

         let finalStatus = existingStatus;

         if (existingStatus !== "granted") {
            const {status} = await Camera.requestCameraPermissionsAsync();

            finalStatus = status;
         }
      }

      permisoCamara();
   }, []);

   async function usarCamara(index) {
      let resultPermissions = null;

      resultPermissions = await ImagePicker.requestCameraPermissionsAsync();

      if (resultPermissions.status === "denied") {
         if (resultPermissions.canAskAgain) {
            Alert.alert(
               i18n.t("permissions.title"),
               i18n.t("permissions.text")
            );
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

      if (index == 4) {
         let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 0.5,
            videoMaxDuration: 8,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
         });
         if (!result.canceled) {
            const videoUri = result?.assets[0].uri;
            context.setVideo1(videoUri);
            setVideo1(videoUri);
         }
      } else {
         let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
         });
         if (!result.canceled) {
            const imageUri = result?.assets[0].uri;
            if (index == 1) {
               context.setImagen1(imageUri);
               setImagen1(imageUri);
            }

            if (index == 2) {
               context.setImagen2(imageUri);
               setImagen2(imageUri);
            }

            if (index == 3) {
               context.setImagen3(imageUri);
               setImagen3(imageUri);
            }
         }
      }
   }

   function _borrarImagen() {
      switch (imagenIndex) {
         case 1:
            setImagen1(null);
            context.setImagen1(null);
            break;
         case 2:
            setImagen2(null);
            context.setImagen2(null);
            break;
         case 3:
            setImagen3(null);
            context.setImagen2(null);
            break;
      }

      setModalImagen(false);

      usarCamara(imagenIndex);
   }

   function _borrarVideo() {
      setVideo1(null);

      context.setVideo1(null);

      setModalVideo(false);

      usarCamara(videoIndex);
   }

   async function _openCamara(index, imagen, video) {
      if (imagen) {
         setModalImagen(true);
         setZoomImagen(imagen);
         setimagenIndex(index);

         return;
      }

      if (video) {
         setModalVideo(true);
         setVideoIndex(index);

         return;
      }

      usarCamara(index);
   }

   const ImagenButton = ({index, imagen}) => {
      return (
         <View style={{width: 170, height: 140, padding: 10}}>
            <TouchableOpacity
               onPress={_openCamara.bind(this, index, imagen, null)}
            >
               <Image
                  source={imagen ? {uri: imagen} : emptyImage}
                  style={{width: "100%", height: "100%"}}
                  resizeMode="cover"
               />
            </TouchableOpacity>
         </View>
      );
   };

   const VideoButton = ({index, video}) => {
      return (
         <View style={{width: 170, height: 140, padding: 10}}>
            <TouchableOpacity
               onPress={_openCamara.bind(this, index, null, video)}
            >
               <Image
                  source={video ? {uri: video} : emptyVideo}
                  style={{width: "100%", height: "100%"}}
                  resizeMode="cover"
               />
               {video && (
                  <View
                     style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <FontAwesome5 name="play-circle" size={35} color="#fff" />
                  </View>
               )}
            </TouchableOpacity>
         </View>
      );
   };

   return (
      <View style={{flex: 1}}>
         <Animated.View
            style={{
               flex: 1,
               height: "100%",
               opacity: animatedOpacity,
            }}
         >
            <Text style={Styles.titleStyle}>{i18n.t("reports.photos")}</Text>

            <View style={{height: 8}} />

            <View
               style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
               }}
            >
               <ImagenButton
                  index={1}
                  imagen={imagen1}
                  navigation={navigation}
               />
               <ImagenButton
                  index={2}
                  imagen={imagen2}
                  navigation={navigation}
               />
               <ImagenButton
                  index={3}
                  imagen={imagen3}
                  navigation={navigation}
               />
               <VideoButton index={4} video={video1} navigation={navigation} />
            </View>
         </Animated.View>
         <Modal
            visible={modalImagen}
            transparent={true}
            onBackButtonPress={() => setModalImagen(false)}
         >
            <View style={{flex: 1, backgroundColor: "#000"}}>
               <View
                  style={{
                     flex: 0.1,
                     padding: 10,
                     justifyContent: "center",
                     alignItems: "flex-end",
                  }}
               >
                  <TouchableOpacity onPress={() => setModalImagen(false)}>
                     <FontAwesome5 name="times" size={35} color="#fff" />
                  </TouchableOpacity>
               </View>
               <ImageZoom
                  imageUrls={zoomImagen ? [{url: zoomImagen}] : []}
                  renderIndicator={() => null}
                  saveToLocalByLongPress={false}
               />
               <View
                  style={{
                     flexDirection: "row",
                     padding: 15,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <TouchableOpacity onPress={() => _borrarImagen()}>
                     <FontAwesome5 name="edit" size={35} color="#fff" />
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
         <Modal
            visible={modalVideo}
            transparent={true}
            onBackButtonPress={() => setModalVideo(false)}
         >
            <View style={{flex: 1, backgroundColor: "#000"}}>
               <View
                  style={{
                     flex: 0.1,
                     padding: 10,
                     justifyContent: "center",
                     alignItems: "flex-end",
                  }}
               >
                  <TouchableOpacity onPress={() => setModalVideo(false)}>
                     <FontAwesome5 name="times" size={35} color="#fff" />
                  </TouchableOpacity>
               </View>
               <Video
                  style={{flex: 1}}
                  source={{uri: video1}}
                  resizeMode="cover"
                  onPlaybackStatusUpdate={(status) =>
                     status.didJustFinish ? setModalVideo(false) : null
                  }
                  shouldPlay
               />
               <View
                  style={{
                     flexDirection: "row",
                     paddingVertical: 15,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <TouchableOpacity onPress={() => _borrarVideo()}>
                     <FontAwesome5 name="edit" size={35} color="#fff" />
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </View>
   );
}

export default Consumer(SeleccionarFotos);
