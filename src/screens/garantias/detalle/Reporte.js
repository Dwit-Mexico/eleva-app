import React, {useState, useEffect} from "react";
import {
   Alert,
   ScrollView,
   View,
   Text,
   TouchableOpacity,
   Image,
   Modal,
   ImageBackground,
   ActivityIndicator,
   Dimensions,
} from "react-native";
import {useRoute} from "@react-navigation/native";
import {Consumer} from "../../../context";
import {FontAwesome5} from "@expo/vector-icons";
import ImageZoom from "react-native-image-zoom-viewer";
import Request from "../../../core/api";
import {Video} from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import Container from "../../../components/container";
import Button from "../../../components/boton/BotonAccion";
import Styles from "../../../styles/screens/DetalleStyle";
import Colores from "../../../styles/colores";
import {useLanguageContext} from "../../../context/lang";
const request = new Request();
const {width, height} = Dimensions.get("screen");

const DetalleReporte = ({navigation, context}) => {
   const {locale, i18n} = useLanguageContext();
   const translate = locale === "en";
   const route = useRoute();
   const params = route.params;
   const info = params.data;

   const [modalImagen, setModalImagen] = useState(false);
   const [modalVideo, setModalVideo] = useState(false);
   const [zoomImagen, setZoomImagen] = useState(null);
   const [playVideo, setPlayVideo] = useState(null);
   const [loadingCancel, setLoadingCancel] = useState(false);
   const [isPreloading, setIsPreloading] = useState(true);
   const [posterVideo, setPosterVideo] = useState(null);

   useEffect(() => {
      (async () => {
         if (info.Vid1) {
            const {uri} = await VideoThumbnails.getThumbnailAsync(info.Vid1, {
               time: 15000,
            });

            setPosterVideo(uri);
         }
      })();
   }, [info]);

   const _openCamara = (imagen, video) => {
      if (imagen) {
         setModalImagen(true);
         setZoomImagen(imagen);

         return;
      }

      if (video) {
         setModalVideo(true);
         setPlayVideo(video);

         return;
      }
   };

   const ImagenButton = ({imagen}) => {
      const EmptyImage = require("../../../../assets/picture.jpg");

      return (
         <View style={{width: 100, height: 80, padding: 5}}>
            <TouchableOpacity onPress={() => _openCamara(imagen, null)}>
               <Image
                  source={imagen || EmptyImage}
                  style={{width: "100%", height: "100%"}}
                  resizeMode="cover"
               />
            </TouchableOpacity>
         </View>
      );
   };

   const VideoButton = ({video}) => {
      return (
         <View style={{width: 100, height: 80, padding: 5}}>
            <TouchableOpacity onPress={() => _openCamara(null, video)}>
               {!posterVideo ? (
                  <View
                     style={{
                        backgroundColor: "#000",
                        width: "100%",
                        height: "100%",
                     }}
                  />
               ) : (
                  <Image
                     source={{uri: posterVideo}}
                     style={{width: "100%", height: "100%"}}
                     resizeMode="cover"
                  />
               )}
               <View
                  style={{
                     position: "absolute",
                     width: "100%",
                     height: "100%",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <FontAwesome5 name="play-circle" size={30} color="#fff" />
               </View>
            </TouchableOpacity>
         </View>
      );
   };

   async function _cancelarReporte() {
      setLoadingCancel(true);

      const response = await request.post("/app/garantias/cancelar", {
         IdSolicitud: info.IdSolicitud,
      });

      if (response.error) {
         Alert.alert(null, response.message || i18n.t("error.intern"));
      } else if (response.cancelado) {
         await context.reloadReportes(translate);
         navigation.goBack();
      } else {
         Alert.alert(null, i18n.t("reporte.errorCancel"));
      }

      setLoadingCancel(false);
   }

   return (
      <ImageBackground
         source={require("../../../../assets/background.jpg")}
         style={{flex: 1, width: "100%", height: "100%"}}
      >
         <View style={Styles.backGround}>
            <Container>
               <ScrollView>
                  <View
                     style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="map-marked-alt"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.NombreProyecto}
                        </Text>
                     </View>
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="home"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.Numero}
                        </Text>
                     </View>
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="map-marker-alt"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.NombreArea}
                        </Text>
                     </View>
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="tools"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.NombreEquipo}
                        </Text>
                     </View>
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="house-damage"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.NombreProblema}
                        </Text>
                     </View>
                     <View style={Styles.lista}>
                        <FontAwesome5
                           name="hashtag"
                           size={20}
                           color={Colores.DetalleText}
                        />
                        <Text style={Styles.listaText}>
                           &nbsp;{info.NoSolicitud}
                        </Text>
                     </View>
                     <View style={{height: 16}} />
                     <View style={Styles.comentarios}>
                        <Text style={{fontSize: 14}}>
                           &nbsp;{info.Comentarios}
                        </Text>
                     </View>
                     <View style={{height: 16}} />
                     <View
                        style={{
                           flexDirection: "row",
                           justifyContent: "center",
                           width: "100%",
                        }}
                     >
                        <View style={Styles.imagenesContent}>
                           {info.Img1 ? (
                              <ImagenButton
                                 index={1}
                                 imagen={{uri: info.Img1}}
                              />
                           ) : (
                              <></>
                           )}
                           {info.Img2 ? (
                              <ImagenButton
                                 index={2}
                                 imagen={{uri: info.Img2}}
                              />
                           ) : (
                              <></>
                           )}
                           {info.Img3 ? (
                              <ImagenButton
                                 index={3}
                                 imagen={{uri: info.Img3}}
                              />
                           ) : (
                              <></>
                           )}
                           {info.Vid1 ? (
                              <VideoButton index={4} video={{uri: info.Vid1}} />
                           ) : (
                              <></>
                           )}
                        </View>
                     </View>
                     <View style={{height: 16}} />
                     <View
                        style={{
                           paddingHorizontal: 30,
                           width: "100%",
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        {info.IdEstado == 1 ? (
                           <Button
                              onPress={_cancelarReporte.bind(this)}
                              loading={loadingCancel}
                           >
                              <Text
                                 allowFontScaling={false}
                                 style={Styles.buttonText}
                              >
                                 Cancelar Reporte
                              </Text>
                           </Button>
                        ) : null}
                     </View>
                     <View style={{height: 16}} />
                  </View>
               </ScrollView>
               <Modal
                  visible={modalImagen}
                  transparent={true}
                  onBackButtonPress={() => setModalImagen(false)}
                  onRequestClose={() => setModalImagen(false)}
                  style={{width: width, height: height}}
               >
                  <View
                     style={{
                        width: width,
                        height: height,
                        backgroundColor: "#000",
                     }}
                  >
                     <View
                        style={{
                           position: "absolute",
                           zIndex: 3,
                           elevation: 3,
                           right: 25,
                           top: 25,
                        }}
                     >
                        <TouchableOpacity onPress={() => setModalImagen(false)}>
                           <FontAwesome5 name="times" size={35} color="#fff" />
                        </TouchableOpacity>
                     </View>
                     <ImageZoom
                        imageUrls={zoomImagen ? [{url: zoomImagen.uri}] : []}
                        renderIndicator={() => null}
                        saveToLocalByLongPress={false}
                        style={{width: width, height: height}}
                     />
                  </View>
               </Modal>
               <Modal
                  visible={modalVideo}
                  transparent={true}
                  onBackButtonPress={() => setModalVideo(false)}
                  onRequestClose={() => setModalVideo(false)}
                  style={{flex: 1}}
               >
                  <View style={{flex: 1, backgroundColor: "#000"}}>
                     <View
                        style={{
                           position: "absolute",
                           zIndex: 3,
                           elevation: 3,
                           right: 25,
                           top: 25,
                        }}
                     >
                        <TouchableOpacity onPress={() => setModalVideo(false)}>
                           <FontAwesome5 name="times" size={35} color="#fff" />
                        </TouchableOpacity>
                     </View>
                     {isPreloading && (
                        <ActivityIndicator
                           animating
                           color={Colores.spinnerColor}
                           size="large"
                           style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                        />
                     )}
                     <Video
                        style={{width: width, height: height}}
                        source={playVideo}
                        shouldPlay
                        resizeMode="contain"
                        onPlaybackStatusUpdate={(status) =>
                           status.didJustFinish ? setModalVideo(false) : null
                        }
                     />
                  </View>
               </Modal>
            </Container>
         </View>
      </ImageBackground>
   );
};

export default Consumer(DetalleReporte);
