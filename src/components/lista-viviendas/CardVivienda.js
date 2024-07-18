import React from "react";
import {View, Text} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

//Styles
import CardStyles from "../../styles/components/CardViviendaStyle";

function CardVivienda(props) {
   return (
      <View style={CardStyles.card}>
         <Text
            style={{
               padding: 2,
               fontSize: 18,
               fontWeight: "bold",
               color: "#B29360",
            }}
         >
            {props.proyecto}
         </Text>
         <Text style={{padding: 2}}>{props.nombre}</Text>
         <Text style={{padding: 2}}>{props.direccion}</Text>
         <Text style={{padding: 2}}>Validez Garantía: {props.fecha}</Text>
      </View>
   );
}

export default CardVivienda;
