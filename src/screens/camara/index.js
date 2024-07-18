import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, Linking, Platform} from "react-native";
import {Camera} from "expo-camera";
import {
   useFocusEffect,
   useNavigation,
   useRoute,
} from "@react-navigation/native";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import Preview from "./preview";
import Container from "../../components/container";

let camara = null;

const Camara = () => {
   const navigation = useNavigation();
   const [hasPermission, setHasPermission] = useState(null);
   const [type, setType] = useState(Camera.Constants.Type.back);
   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
   const [imagen, setImagen] = useState(null);
   const [view, setView] = useState("camara");
   const [imgIndex, setImagenIndex] = useState(0);
   const [esDetalle, setEsDetalle] = useState(false);

   const route = useRoute();

   useFocusEffect(() => {
      const {imagenIndex, esDetalle} = route.params;
      setImagenIndex(imagenIndex);
      setEsDetalle(esDetalle);
   });

   useEffect(() => {
      (async () => {
         const {status} = await Camera.requestCameraPermissionsAsync();

         setHasPermission(status === "granted");
      })();
   }, []);

   async function _getPermisos() {
      if (Platform.OS == "ios") {
         Linking.openURL("app-settings:");
      } else {
         const {status} = await Camera.requestCameraPermissionsAsync();

         setHasPermission(status === "granted");
      }
   }

   function _activarFlash() {
      if (flash !== 0) {
         setFlash(Camera.Constants.FlashMode.off);
      } else {
         setFlash(Camera.Constants.FlashMode.on);
      }
   }

   async function _tomarFoto() {
      if (camara) {
         const picture = await camara.takePictureAsync();
         setImagen(picture);
         setView("preview");
      }
   }

   async function _aceptarFotos() {
      if (navigation.canGoBack()) {
         navigation.setParams(imagen);
         navigation.navigate(esDetalle ? "DetalleGarantia" : "NuevaGarantia", {
            imagen,
            imagenIndex: imgIndex,
         });
      }
   }

   async function _cancelarFoto() {
      setView("camara");
      setImagen(null);
   }

   if (!hasPermission) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#000",
            }}
         >
            <TouchableOpacity onPress={_getPermisos.bind(this)}>
               <Text style={{color: "white"}}>Activar Permisos de cámara</Text>
            </TouchableOpacity>
         </View>
      );
   }

   return (
      <View style={{flex: 1, backgroundColor: "#000"}}>
         {view == "camara" ? (
            <Container>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "flex-end",
                     alignItems: "center",
                     height: 50,
                     marginTop: 50,
                  }}
               >
                  <TouchableOpacity
                     onPress={_activarFlash.bind(this)}
                     style={{marginRight: 20}}
                  >
                     {flash === Camera.Constants.FlashMode.off ? (
                        <MaterialIcons
                           name="flash-off"
                           size={30}
                           color="white"
                        />
                     ) : (
                        <MaterialIcons
                           name="flash-on"
                           size={30}
                           color="white"
                        />
                     )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                     <FontAwesome5 name="times" color={"white"} size={30} />
                  </TouchableOpacity>
               </View>
               <Camera
                  type={type}
                  flashMode={flash}
                  style={{flex: 1}}
                  ref={(ref) => {
                     camara = ref;
                  }}
               ></Camera>
               <View
                  style={{
                     flex: 0.1,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <TouchableOpacity
                     onPress={_tomarFoto.bind(this)}
                     style={{
                        backgroundColor: "white",
                        padding: 6,
                        borderRadius: 50,
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <FontAwesome5 name="camera" size={35} color="black" />
                  </TouchableOpacity>
               </View>
            </Container>
         ) : (
            <Preview
               imagen={imagen}
               aceptarFotos={_aceptarFotos.bind(this)}
               cancelarFoto={_cancelarFoto.bind(this)}
            />
         )}
      </View>
   );
};

export default Camara;
