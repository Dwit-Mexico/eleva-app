import React, {useState} from "react";
import {Alert, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {Consumer} from "../../context";
import Request from "../../core/api";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function BotonNuevo({navigation, screen, context}) {
  const {i18n, locale} = useLanguageContext();
  const [loading, setLoading] = useState(false);

  async function nuevoReporte() {
    setLoading(true);

    if (context) {
      context.setStep(1);
      context.setUnidad(null);
      context.setArea(null);
      context.setEquipo(null);
      context.setProblema(null);
      context.setComentario(null);
      context.setImagen1(null);
      context.setImagen2(null);
      context.setImagen3(null);
      context.setVideo1(null);
    }

    const response = await request.post("/app/users/vigencia/garantia");

    if (response.error) {
      if (locale !== "en") {
        Alert.alert(
          null,
          response.message || "No se pudo validar la vigencia."
        );
      } else {
        Alert.alert(null, "Could not validate the guarantee.");
      }
    }

    if (response.valido) {
      navigation.navigate(screen);
    } else {
      Alert.alert(
        null,
        i18n.t("apiResponse.newButton") || "La vigencia no válida."
      );
    }

    setLoading(false);
  }

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => (loading ? null : nuevoReporte(this))}
        style={{
          backgroundColor: "#B29360",
          borderRadius: 50,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size={17} color={"#fff"} />
          ) : (
            <FontAwesome5 name="plus" size={20} color={"#fff"} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Consumer(BotonNuevo);
