import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import moment from "moment-timezone";
import CardStyles from "../../styles/components/CardGarantiaStyle";
import Colores from "../../styles/colores";

function CardGarantia(props) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(props.item);
  }, [props.item]);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
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
              allowFontScaling={false}
              style={{
                padding: 2,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: Colores.CardGarantiaTitulo,
              }}
            >
              {info.NombreProyecto}
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
              color={Colores.CardGarantiaColor}
              size={20}
            />
            <Text
              allowFontScaling={false}
              style={{
                padding: 2,
                fontSize: 19,
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
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FontAwesome5
              name="map-marker-alt"
              color={Colores.CardGarantiaColor}
              size={20}
            />
            <Text
              allowFontScaling={false}
              style={{
                padding: 2,
                fontSize: 19,
                textAlign: "center",
                color: Colores.CardGarantiaColor,
              }}
            >
              {info.NombreArea}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text
            allowFontScaling={true}
            style={{
              padding: 2,
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              color: Colores.CardGarantiaColor,
            }}
          >
            {moment.utc(info.Fecha).format("DD/MM/YYYY")}
          </Text>
          <Text
            style={{
              padding: 2,
              fontSize: 16,
              textAlign: "center",
              color: Colores.CardGarantiaColor,
            }}
          >
            {info.NoSolicitud}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardGarantia;
