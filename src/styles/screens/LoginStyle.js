import {StyleSheet} from "react-native";

export default StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#000000A1",
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "relative",
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 44,
  },
  languageContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  languageButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
  },
  inputs: {
    color: "#fff",
  },
});
