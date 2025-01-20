import {StyleSheet} from "react-native";
import Colores from "../colores";

export default StyleSheet.create({
  navigationButton: {
    backgroundColor: "#B29360",
    color: "#ffffff",
    padding: 8,
    width: 120,
    height: 50,
    textAlign: "center",
    borderRadius: 5,
    marginHorizontal: 8,
  },
  navigationButtonText: {
    fontSize: 19,
    textAlign: "center",
    color: "#fff",
  },
  titleStyle: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    color: Colores.WizardTitle,
  },
  comentarios: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 17,
    textAlignVertical: "top",
    fontSize: 14,
    minHeight: 100,
    maxHeight: 200,
  },
  comentariosText: {
    color: "#000",
  },
});
