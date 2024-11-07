import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Request from "../../core/api";
import CardStyles from "../../styles/components/CardUsuarioStyle";
import Colores from "../../styles/colores";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function CardUsuario(props) {
  const {i18n} = useLanguageContext();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInfo(props.item);
  }, [props.item]);

  async function elimiarUsuario(IdPersona) {
    setLoading(true);

    Alert.alert(
      i18n.t("users.titleRemove"),
      i18n.t("users.remove"),
      [
        {
          text: "Sí",
          onPress: async () => {
            const response = await request.post("/app/usuarios/eliminar", {
              IdPersona,
            });

            if (response.error) {
              Alert.alert(null, i18n.t("users.errorRemove"));
            }

            if (response.deleted) {
              props.reload();

              Alert.alert(i18n.t("users.deleted"));
            } else {
              Alert.alert(null, i18n.t("users.errorRemove"));
            }

            setLoading(false);
          },
        },
        {
          text: "No",
          onPress: () => setLoading(false),
          style: "cancel",
        },
      ],
      {cancelable: false}
    );
  }

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() =>
        props.navigation
          ? props.navigation.navigate(props.ruta, {
              garantiaEtapa: props.etapa,
              IdUnidad: info.IdUnidad,
              IdArea: info.IdArea,
              info: info,
            })
          : null
      }
    >
      <View style={CardStyles.card}>
        <View style={styles.flexStart}>
          <View style={styles.row}>
            <Text
              style={styles.userName}
            >{`${info.Nombre} ${info.Apellidos}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.userEmail}>{info.Email}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome5
              name="home"
              size={18}
              color={Colores.CardGarantiaColor}
            />
            <Text style={styles.userNumber}>{info.Numero}</Text>
          </View>
          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => elimiarUsuario(info.IdPersona)}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <FontAwesome5
                  name="trash"
                  size={18}
                  color={Colores.CardGarantiaColor}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  flexStart: {
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userName: {
    padding: 2,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colores.CardGarantiaTitulo,
  },
  userEmail: {
    padding: 2,
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    color: Colores.CardGarantiaColor,
  },
  userNumber: {
    padding: 2,
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    color: Colores.CardGarantiaColor,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#F24236",
    padding: 10,
    borderRadius: 4,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardUsuario;
