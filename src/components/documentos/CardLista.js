import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Style from "../../styles/components/CardCarpetaStyle";
import Colores from "../../styles/colores";

function ListaDocumentos({navigation, item}) {
   return (
      <TouchableOpacity
         onPress={() => navigation.navigate("VistaDocumento", {data: item})}
      >
         <View style={Style.card}>
            <FontAwesome5
               name="file-pdf"
               size={30}
               color={Colores.CardCarpetaColor}
            />
            <View style={{width: 20}}></View>
            <Text style={Style.text}>{item.NombreDocumento}</Text>
         </View>
      </TouchableOpacity>
   );
}

export default ListaDocumentos;
