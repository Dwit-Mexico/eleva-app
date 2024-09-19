import {StyleSheet} from "react-native";
import Colores from "./colores";

export default StyleSheet.create({
  LoginTitle: {
    fontSize: 18,
    color: Colores.tituloLogin,
    textAlign: "center",
    padding: 16,
  },
  loginButton: {
    color: Colores.loginButtonText,
    textAlign: "center",
    fontSize: 18,
  },
  logoutButton: {
    color: Colores.logoutButtonText,
    textAlign: "center",
    fontSize: 18,
  },
  EtapaTitulo: {
    fontSize: 18,
    color: Colores.titulos,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  loginButton: {
    color: Colores.loginButtonText,
    textAlign: "center",
  },
  logoutButton: {
    color: Colores.logoutButtonText,
    textAlign: "center",
  },
  forgotPassword: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});
