import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
   card: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "#eaeaea",
      paddingVertical: 30,
      paddingHorizontal: 10,
   },
   cardLista: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "#eaeaea",
      padding: 10,
   },
   text: {
      flex: 1,
      fontSize: 18,
      color: Colores.CardCarpetaColor,
      fontWeight: "bold",
   },
});
