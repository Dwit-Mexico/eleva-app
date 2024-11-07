import {StyleSheet} from "react-native";

export default StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#000000A1",
  },
  userData: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "90%",
    top: -30,
    borderRadius: 5,
    padding: 5,
    zIndex: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    alignItems: "center",
  },
  logoutButtonView: {
    paddingHorizontal: 4,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  logoutButton: {
    height: 50,
    width: "100%",
    backgroundColor: "#B29360",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userButton: {
    height: 50,
    width: "100%",
    backgroundColor: "#333138",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
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
