import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
   loadingLoginScreen: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: Colores.loadingLoginScreenBG,
   },
   loadingLoginScreenSpinner: {
      color: Colores.loadingLoginScreenSpinner,
   },
});
