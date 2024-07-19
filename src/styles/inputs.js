import {StyleSheet} from "react-native";
import Colores from "./colores";

const input = {
   borderBottomColor: "#ffffff",
   borderBottomWidth: 1,
   borderRadius: 5,
   width: 300,
   padding: 5,
   marginBottom: 5,
   marginTop: 5,
   color: Colores.inputs,
};

const alignCenter = {
   textAlign: "center",
};

export default StyleSheet.create({
   LoginUsername: {
      ...input,
      ...alignCenter,
   },
   LoginPassword: {
      ...input,
      ...alignCenter,
   },
   Select: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#555",
      borderRadius: 8,
   },
   inputNormal: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#eaeaea",
      marginHorizontal: 2,
      marginVertical: 2,
   },
   itemNormal: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderColor: "#B29330",
      borderWidth: 2,
      marginHorizontal: 2,
      marginVertical: 2,
      borderRadius: 2,
   },
   itemTextNormal: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
   },
   itemSelected: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderColor: "#B29330",
      backgroundColor: "#B29330",
      borderWidth: 2,
      marginHorizontal: 2,
      marginVertical: 2,
   },
   itemTextSelected: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 18,
   },
});
