import {StyleSheet} from "react-native";

export default StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#000000A1",
  },
  logoutButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  logoutButton: {
    backgroundColor: "#B29360",
    padding: 10,
    borderRadius: 4,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  userButton: {
    height: 50,
    width: "45%",
    backgroundColor: "#333138",
    borderRadius: 4,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontWeight: "semibold",
    color: "white",
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});
