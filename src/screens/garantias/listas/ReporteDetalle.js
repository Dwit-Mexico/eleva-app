import React, {useState, useEffect} from "react";
import {View, Text, ImageBackground} from "react-native";
import {useRoute} from "@react-navigation/native";
import {Consumer} from "../../../context";
import {FontAwesome5} from "@expo/vector-icons";
import moment from "moment-timezone";
import Container from "../../../components/container";
import ListaGarantiasDetalle from "../../../components/lista-garantias-detalle";
import Styles from "../../../styles/screens/GarantiasStyle";
import Colores from "../../../styles/colores";

const ListaDetalleReporte = ({navigation, context}) => {
   const [list, setList] = useState([]);
   const [info, setInfo] = useState({});
   const route = useRoute();

   useEffect(() => {
      const {info} = route.params;
      if (info) {
         const array = Array.isArray(info.Detalle) ? info.Detalle : [];
         setList(array);
      }
   }, []);

   if (context) {
      useEffect(() => {
         const {params} = route;

         if (params.info) {
            setInfo(params.info);
         }
      }, [route.params]);
   }

   return (
      <ImageBackground
         source={require("../../../../assets/background2.jpg")}
         style={{flex: 1, height: "100%"}}
      >
         <View style={Styles.backGround}>
            <Container>
               <View style={{paddingHorizontal: 10, flex: 0.2}}>
                  <View
                     style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        backgroundColor: "#00000099",
                        paddingHorizontal: 10,
                     }}
                  >
                     <View
                        style={{
                           flexDirection: "row",
                           width: "50%",
                           alignItems: "center",
                           justifyContent: "flex-start",
                        }}
                     >
                        <FontAwesome5
                           name="map-marker-alt"
                           color={Colores.CardGarantiaTitulo}
                           size={20}
                        />
                        <Text
                           style={{
                              fontSize: 19,
                              fontWeight: "bold",
                              color: Colores.CardGarantiaTitulo,
                           }}
                        >
                           &nbsp; {info.NombreArea}
                        </Text>
                     </View>
                     <View
                        style={{
                           flexDirection: "column",
                           width: "50%",
                           alignItems: "flex-end",
                           justifyContent: "center",
                        }}
                     >
                        <Text
                           allowFontScaling={false}
                           style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: Colores.CardGarantiaColor,
                           }}
                        >
                           {moment(info.Fecha).tz("GMT").format("DD/MM/YYYY")}
                        </Text>
                        <Text
                           style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: Colores.CardGarantiaColor,
                           }}
                        >
                           {info.NoSolicitud}
                        </Text>
                     </View>
                  </View>
               </View>
               <View style={{height: 8}} />
               <View style={{flex: 1}}>
                  <ListaGarantiasDetalle
                     navigation={navigation}
                     etapa={1}
                     lista={list}
                     reporte={true}
                  />
               </View>
            </Container>
         </View>
      </ImageBackground>
   );
};

export default Consumer(ListaDetalleReporte);
