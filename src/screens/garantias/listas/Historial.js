import React, {useState, useEffect} from "react";
import {
  View,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Consumer} from "../../../context";
import Container from "../../../components/container";
import ListaGarantias from "../../../components/lista-garantias-detalle";
import Styles from "../../../styles/screens/GarantiasStyle";

const Historial = ({navigation, context}) => {
  const [lista, setLista] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function onRefresh() {
    if (context) {
      setIsLoading(true);
      await context.reloadReportes(translate);
    }
    setIsLoading(false);
  }

  if (context) {
    useEffect(() => {
      let reportes = context.reportes;

      if (Array.isArray(reportes)) {
        reportes = reportes.filter((r) => r.IdEstado == 9 || r.IdEstado == 3);
        setLista(reportes);
      }
    }, [context.reportes]);
  }

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ImageBackground
      source={require("../../../../assets/background2.jpg")}
      style={{flex: 1}}
    >
      <View style={Styles.backGround}>
        <ListaGarantias navigation={navigation} lista={lista} etapa={4} />
        <Pressable
          style={{
            backgroundColor: "#B29360",
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
          onPress={onRefresh}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Ionicons name="reload" size={24} color="#ffffff" />
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Consumer(Historial);
