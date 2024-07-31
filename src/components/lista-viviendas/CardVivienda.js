import React from "react";
import {View, Text} from "react-native";
import CardStyles from "../../styles/components/CardViviendaStyle";
import {useLanguageContext} from "../../context/lang";

function CardVivienda(props) {
   const {i18n} = useLanguageContext();
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
         <Text style={{padding: 2}}>
            {i18n.t("profile.warranty")}: {props.fecha}
         </Text>
      </View>
   );
}

export default CardVivienda;
