import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Style from "../../styles/components/CardCarpetaStyle";
import Colores from "../../styles/colores";

function ListaViviendas({navigation, item}) {
   return (
      <TouchableOpacity
         onPress={() =>
            navigation.navigate("ListaDocumentos", {
               data: item,
               title: item.NombreFolder,
            })
         }
      >
         <View style={Style.card}>
            <FontAwesome5
               name="folder"
               size={40}
               color={Colores.CardCarpetaColor}
            />
            <View style={{width: 20}}></View>
            {item.NombreProyecto ? (
               <View>
                  <Text style={Style.text}>
                     {item.NombreFolder.toUpperCase()}
                  </Text>
                  <Text
                     style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: Colores.CardGarantiaTitulo,
                     }}
                  >
                     {item.NombreProyecto.toUpperCase()}
                  </Text>
               </View>
            ) : (
               <Text style={Style.text}>{item.NombreFolder.toUpperCase()}</Text>
            )}
         </View>
      </TouchableOpacity>
   );
}

export default ListaViviendas;
