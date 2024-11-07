import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
      }}
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
        <View style={{alignItems: "flex-start"}}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                padding: 2,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: Colores.CardGarantiaTitulo,
              }}
            >{`${info.Nombre} ${info.Apellidos}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                padding: 2,
                fontSize: 19,
                fontWeight: "bold",
                textAlign: "center",
                color: Colores.CardGarantiaColor,
              }}
            >
              {info.Email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FontAwesome5
              name="home"
              size={20}
              color={Colores.CardGarantiaColor}
            />
            <Text
              style={{
                padding: 2,
                fontSize: 19,
                fontWeight: "bold",
                textAlign: "center",
                color: Colores.CardGarantiaColor,
              }}
            >
              {info.Numero}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 0.5,
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F24236",
                padding: 10,
                borderRadius: 4,
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => elimiarUsuario(info.IdPersona)}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <FontAwesome5
                  name="trash"
                  size={20}
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

export default CardUsuario;
