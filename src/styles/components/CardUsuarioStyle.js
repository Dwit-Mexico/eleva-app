import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    minWidth: 300,
    borderColor: "#aaa",
    borderBottomColor: Colores.CardGarantiaTitulo,
    borderWidth: 0,
    borderBottomWidth: 5,
    borderRadius: 4,
    backgroundColor: "#00000082",
    flexDirection: "row",
    marginBottom: 30,
    padding: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
