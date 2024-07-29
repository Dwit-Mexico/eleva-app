import React, {useState, useEffect} from "react";
import {View, Text, ImageBackground} from "react-native";
import {Consumer} from "../../../context";
import moment from "moment-timezone";
import Container from "../../../components/container";
import ListaGarantias from "../../../components/lista-garantias";
import BotonNuevo from "../../../components/boton-nuevo/BotonNuevo";
import Styles from "../../../styles/screens/GarantiasStyle";
import {useLanguageContext} from "../../../context/lang";

const ListaReporte = ({navigation, context}) => {
   const {i18n, locale} = useLanguageContext();
   const translate = locale === "en";
   const [lista, setLista] = useState([]);

   useEffect(() => {
      onRefresh();
   }, []);

   async function onRefresh() {
      if (context) {
         await context.reloadReportes(translate);
         await context.reloadReportesAgrupados();
      }
   }

   if (context) {
      useEffect(() => {
         if (Array.isArray(context.reportesAgrupados)) {
            const array = context.reportesAgrupados.sort((a, b) => {
               if (moment(a.Fecha).isAfter(moment(b.Fecha))) return -1;
               if (moment(a.Fecha).isBefore(moment(b.Fecha))) return 1;
               return 0;
            });
            setLista(array);
         }
      }, [context.reportesAgrupados]);
   }

   return (
      <ImageBackground
         source={require("../../../../assets/background2.jpg")}
         style={{flex: 1, height: "100%"}}
      >
         <View style={Styles.backGround}>
            <Container>
               <View style={{flex: 1}}>
                  <ListaGarantias navigation={navigation} lista={lista} />
               </View>
               <View
                  style={{
                     flex: 0.1,
                     flexDirection: "row",
                     position: "relative",
                     justifyContent: "center",
                     alignItems: "center",
                     paddingHorizontal: 20,
                  }}
               >
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                     }}
                  >
                     <View style={{maxWidth: 260}}>
                        <Text style={{color: "#ffffff", fontSize: 18}}>
                           {i18n.t("reports.details")}
                        </Text>
                     </View>
                     <BotonNuevo
                        navigation={navigation}
                        screen={"NuevaGarantia"}
                     />
                  </View>
               </View>
            </Container>
         </View>
      </ImageBackground>
   );
};

export default Consumer(ListaReporte);
