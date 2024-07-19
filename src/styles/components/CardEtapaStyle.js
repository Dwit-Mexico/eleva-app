import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
   card: {
      flex: 1,
      borderWidth: 0,
      flexDirection: "column",
      padding: 10,
      margin: 20,
   },
   titulo: {
      padding: 5,
      fontSize: 22,
      textAlign: "center",
      color: Colores.CardEtapaColor,
   },
});
