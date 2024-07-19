import React from "react";
import {ScrollView} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import CardEtapa from "./CardEtapa";
import Colores from "../../styles/colores";

function ListaViviendas({navigation}) {
   return (
      <ScrollView>
         <CardEtapa
            etapa={1}
            navigation={navigation}
            titulo="REPORTES"
            icon={
               <FontAwesome5
                  name="book-open"
                  size={30}
                  color={Colores.CardEtapaColor}
               />
            }
            ruta="ListaReportes"
         />
         <CardEtapa
            etapa={2}
            navigation={navigation}
            titulo="STATUS"
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
            titulo="VALORACIONES"
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
            titulo="HISTORIAL"
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
