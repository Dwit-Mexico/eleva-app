import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import CardStyles from "../../styles/components/CardGarantiaDetalleStyle";
import Colores from "../../styles/colores";

function CardGarantia(props) {
   const [item, setItem] = useState({});
   const [titulo, setTitulo] = useState("");
   const [screen, setScreen] = useState("");
   const [estado, setEstado] = useState({color: "#fff", text: ""});

   useEffect(() => {
      switch (props.etapa) {
         case 1:
            setTitulo("Reporte");
            setScreen("DetalleReporte");
            break;
         case 2:
            setTitulo("Garantía");
            setScreen("DetalleGarantia");
            break;
         case 3:
            setTitulo("Valoracion");
            setScreen("DetalleValoracion");
            break;
         case 4:
            setTitulo("Historial");
            setScreen("DetalleHistorico");
            break;
      }
   }, []);

   useEffect(() => {
      if (props.data.item) {
         setItem(props.data.item);
      }
   }, [props.data]);

   useEffect(() => {
      let color, text;

      switch (item.IdEstado) {
         case 1:
            text = "Pendiente";
            color = "#fff";
            break;
         case 2:
            text = "Aplica Garantía";
            color = "green";
            break;
         case 3:
            text = "No Aplica Garantía";
            color = "red";
            break;
         case 4:
            text = "Por Agendar";
            color = "#fff";
            break;
         case 5:
            text = "Programada";
            color = "green";
            break;
         case 6:
            text = "Cancelada";
            color = "#fff";
            break;
         case 7:
            text = "Realizado";
            color = "yellow";
            break;
         case 8:
            text = "Por Valorar";
            color = "#fff";
            break;
         case 9:
            text = "Finalizada";
            color = "#fff";
            break;
      }
      setEstado({color, text});
   }, [item]);

   if (props.reporte) {
      return (
         <TouchableOpacity
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               paddingHorizontal: 10,
            }}
            onPress={() =>
               props.navigation
                  ? props.navigation.navigate(screen, {data: props.data.item})
                  : null
            }
         >
            <View style={CardStyles.card}>
               <View style={{flexDirection: "row", width: "60%"}}>
                  <View
                     style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: 2,
                     }}
                  >
                     <FontAwesome5
                        name="exclamation-circle"
                        size={30}
                        color={Colores.CardGarantiaTitulo}
                     />
                  </View>
                  <View style={{paddingLeft: 15}}>
                     <Text style={{color: Colores.CardGarantiaColor}}>
                        Detalle:
                     </Text>
                     <Text style={{color: Colores.CardGarantiaColor}}>
                        {props.problema}
                     </Text>
                  </View>
               </View>
               <View
                  style={{marginTop: 20, width: "40%", alignItems: "flex-end"}}
               >
                  <Text
                     allowFontScaling={false}
                     style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: estado.color,
                     }}
                  >
                     {estado.text}
                  </Text>
                  <Text
                     allowFontScaling={false}
                     style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: Colores.CardGarantiaColor,
                     }}
                  >
                     {props.fecha}
                  </Text>
               </View>
            </View>
         </TouchableOpacity>
      );
   }

   return (
      <TouchableOpacity
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
         }}
         onPress={() =>
            props.navigation
               ? props.navigation.navigate(screen, {data: props.data.item})
               : null
         }
      >
         <View style={CardStyles.card}>
            <View style={{flexDirection: "row", width: "60%"}}>
               <View
                  style={{flexDirection: "column", justifyContent: "center"}}
               >
                  <FontAwesome5
                     name="exclamation-circle"
                     size={30}
                     color={Colores.CardGarantiaTitulo}
                  />
               </View>
               <View style={{paddingLeft: 15}}>
                  <Text
                     allowFontScaling={false}
                     style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: Colores.CardGarantiaTitulo,
                     }}
                  >
                     {props.proyecto}
                  </Text>
                  <Text style={{color: Colores.CardGarantiaColor}}>
                     {props.unidad}
                  </Text>
                  <Text style={{color: Colores.CardGarantiaColor}}>
                     {props.area}
                  </Text>
               </View>
            </View>
            <View style={{marginTop: 20, width: "40%"}}>
               <Text
                  allowFontScaling={false}
                  style={{
                     fontSize: 12,
                     textAlign: "right",
                     fontWeight: "bold",
                     color: Colores.CardGarantiaColor,
                     marginBottom: 5,
                     color: estado.color,
                  }}
               >
                  {estado.text}
               </Text>
               <Text
                  allowFontScaling={false}
                  style={{
                     fontSize: 12,
                     textAlign: "right",
                     fontWeight: "bold",
                     color: Colores.CardGarantiaColor,
                  }}
               >
                  {props.fecha}
               </Text>
               <Text
                  style={{
                     fontSize: 12,
                     textAlign: "right",
                     fontWeight: "bold",
                     color: Colores.CardGarantiaColor,
                  }}
               >
                  {props.NoSolicitud}
               </Text>
            </View>
         </View>
      </TouchableOpacity>
   );
}

export default CardGarantia;
