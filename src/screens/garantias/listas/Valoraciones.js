import React, {useState, useEffect} from "react";
import {View, Text, ImageBackground} from "react-native";
import {Consumer} from "../../../context";
import Container from "../../../components/container";
import ListaGarantias from "../../../components/lista-garantias-detalle";
import Styles from "../../../styles/screens/GarantiasStyle";
import Colores from "../../../styles/colores";

const ListaValoraciones = ({navigation, context}) => {
   const [lista, setLista] = useState([]);

   if (context) {
      useEffect(() => {
         let reportes = context.reportes;

         if (Array.isArray(reportes)) {
            reportes = reportes.filter((r) => r.IdEstado == 8);
            setLista(reportes);
         }
      }, [context.reportes]);
   }

   return (
      <ImageBackground
         source={require("../../../../assets/background2.jpg")}
         style={{flex: 1}}
      >
         <View style={Styles.backGround}>
            <Container>
               <View style={{width: "100%"}}>
                  <View style={{height: 8}} />
                  <Text
                     style={{fontSize: 18, color: Colores.ValoracionesTitulo}}
                  >
                     Su opinion nos interesa. Ayúdenos a valorar nuestro
                     servicio.
                  </Text>
                  <Text
                     style={{fontSize: 18, color: Colores.ValoracionesTitulo}}
                  >
                     Muchas Gracias
                  </Text>
               </View>
               <ListaGarantias
                  navigation={navigation}
                  lista={lista}
                  etapa={3}
               />
            </Container>
         </View>
      </ImageBackground>
   );
};

export default Consumer(ListaValoraciones);
