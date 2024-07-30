import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
   card: {
      flex: 1,
      borderColor: "#aaa",
      // borderBottomColor: "#B29360",
      borderWidth: 0,
      borderBottomWidth: 1,
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
      backgroundColor: Colores.CardViviendaBG,
   },
});
