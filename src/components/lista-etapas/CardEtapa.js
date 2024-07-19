import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import CardStyles from "../../styles/components/CardEtapaStyle";

function CardEtapa(props) {
   return (
      <TouchableOpacity
         onPress={() =>
            props.navigation
               ? props.navigation.navigate(props.ruta, {
                    garantiaEtapa: props.etapa,
                    detalle: true,
                 })
               : null
         }
      >
         <View style={{...CardStyles.card, backgroundColor: props.background}}>
            <View style={{flex: 1, alignItems: "center"}}>
               <View
                  style={{
                     flex: 1,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  {props.icon}
                  <Text style={CardStyles.titulo}>{props.titulo}</Text>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
}

export default CardEtapa;
