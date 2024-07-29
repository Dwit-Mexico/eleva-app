import React from "react";
import {ScrollView} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import CardEtapa from "./CardEtapa";
import Colores from "../../styles/colores";
import {useLanguageContext} from "../../context/lang";

function ListaViviendas({navigation}) {
   const {i18n} = useLanguageContext();
   return (
      <ScrollView>
         <CardEtapa
            etapa={1}
            navigation={navigation}
            titulo={i18n.t("screen.reports")}
            icon={
               <FontAwesome5
                  name="book-open"
                  size={30}
                  color={Colores.CardEtapaColor}
               />
            }
            ruta="NuevaGarantia"
         />
         <CardEtapa
            etapa={2}
            navigation={navigation}
            titulo={i18n.t("screen.status")}
            icon={
               <FontAwesome5
                  name="book-reader"
                  size={42}
                  color={Colores.CardEtapaColor}
               />
            }
            ruta="ListaGarantias"
         />
         <CardEtapa
            etapa={3}
            navigation={navigation}
            titulo={i18n.t("screen.ratings")}
            icon={
               <FontAwesome5
                  name="award"
                  size={30}
                  color={Colores.CardEtapaColor}
               />
            }
            ruta="ListaValoraciones"
         />
         <CardEtapa
            etapa={4}
            navigation={navigation}
            titulo={i18n.t("screen.history")}
            icon={
               <FontAwesome5
                  name="history"
                  size={30}
                  color={Colores.CardEtapaColor}
               />
            }
            ruta="ListaHistorial"
         />
      </ScrollView>
   );
}

export default ListaViviendas;
