import React, {useState, useEffect} from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import {useRoute} from "@react-navigation/native";
import {Consumer} from "../../../context";
import {FontAwesome5} from "@expo/vector-icons";
import moment from "moment-timezone";
import Request from "../../../core/api";
import Container from "../../../components/container";
import SelectFechas from "../../../components/select/SelectFechas";
import BotonAccion from "../../../components/boton/BotonAccion";
import Styles from "../../../styles/screens/DetalleStyle";
import Colores from "../../../styles/colores";
import {useLanguageContext} from "../../../context/lang";

const request = new Request();

const DetalleGarantia = ({navigation, context}) => {
  const {locale, i18n} = useLanguageContext();
  const translate = locale === "en";
  const [info, setInfo] = useState({});
  const [fechas, setFechas] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  if (route.params) {
    useEffect(() => {
      const {data} = route.params;
      if (data) {
        setInfo(data);
      }
    }, [route.params]);
  }

  useEffect(() => {
    let Fechas = [];
    if (moment.utc(info.Fecha1).isAfter(moment.utc())) {
      Fechas[0] = {
        id: 1,
        name: moment.utc(info.Fecha1).format("DD/MM/YYYY HH:mm"),
      };
    }
    if (moment.utc(info.Fecha2).isAfter(moment.utc())) {
      Fechas[1] = {
        id: 2,
        name: moment.utc(info.Fecha2).format("DD/MM/YYYY HH:mm"),
      };
    }
    if (moment.utc(info.Fecha3).isAfter(moment.utc())) {
      Fechas[2] = {
        id: 3,
        name: moment.utc(info.Fecha3).format("DD/MM/YYYY HH:mm"),
      };
    }
    setFechas(Fechas);
  }, [info]);

  async function handleSubmit() {
    const FechaVisita =
      fecha == 1
        ? moment(info.Fecha1).format()
        : fecha == 2
        ? moment(info.Fecha2).format()
        : fecha == 3
        ? moment(info.Fecha3).format()
        : null;

    if (!FechaVisita) {
      Alert.alert(null, i18n.t("error.date"));
      return;
    }

    setLoading(true);

    const data = {
      FechaVisita,
      ComentariosVisita: comentarios,
      IdSolicitud: info.IdSolicitud,
    };

    const response = await request.post(
      "/app/garantias/update/fecha/visita",
      data
    );

    if (response.error) {
      Alert.alert(null, i18n.t("error.intern"));
    }
    if (response.agendado) {
      await context.reloadReportes(translate);
      navigation.goBack();
    }

    setLoading(false);
  }

  if (info.IdEstado == 3) {
    return (
      <ImageBackground
        source={require("../../../../assets/background.jpg")}
        style={{flex: 1, height: "100%"}}
      >
        <View style={Styles.backGround}>
          <Container>
            <ScrollView>
              <View style={{height: 8}} />

              <Text
                style={{
                  textAlign: "center",
                  color: Colores.DetalleText,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                No Aplica Garantía
              </Text>

              <View style={Styles.lista}>
                <FontAwesome5
                  name="map-marked-alt"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>
                  &nbsp;{info.NombreProyecto}
                </Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="tools"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="house-damage"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>
                  &nbsp;{info.NombreProblema}
                </Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="hashtag"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
              </View>

              <View style={{height: 16}} />

              <View style={Styles.comentarios}>
                <Text style={{fontSize: 16, color: "#000"}}>
                  {info.ComentariosAplica}
                </Text>
              </View>
              <View style={{height: 32}} />
            </ScrollView>
          </Container>
        </View>
      </ImageBackground>
    );
  }

  if (info.IdEstado == 5) {
    return (
      <ImageBackground
        source={require("../../../../assets/background.jpg")}
        style={{flex: 1, height: "100%"}}
      >
        <View style={Styles.backGround}>
          <Container>
            <ScrollView>
              <View style={{height: 8}} />

              <Text
                style={{
                  textAlign: "center",
                  color: "#000",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: Colores.DetalleText,
                }}
              >
                Programada
              </Text>

              <View style={{height: 16}} />

              <View style={Styles.lista}>
                <FontAwesome5
                  name="map-marked-alt"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>
                  &nbsp;{info.NombreProyecto}
                </Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.Numero}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NombreArea}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="tools"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NombreEquipo}</Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="house-damage"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>
                  &nbsp;{info.NombreProblema}
                </Text>
              </View>
              <View style={Styles.lista}>
                <FontAwesome5
                  name="hashtag"
                  size={20}
                  color={Colores.DetalleText}
                />
                <Text style={Styles.listaText}>&nbsp;{info.NoSolicitud}</Text>
              </View>

              <View style={{height: 24}} />
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  padding: 5,
                  color: Colores.DetalleText,
                }}
              >
                Fecha Visita:{" "}
                {info.FechaVisita
                  ? moment.utc(info.FechaVisita).format("DD/MM/YYYY HH:mm")
                  : "Sin fecha asignada"}
              </Text>

              <View style={{height: 32}} />
            </ScrollView>
          </Container>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../../../assets/background.jpg")}
      style={{flex: 1, height: "100%"}}
    >
      <View style={Styles.backGround}>
        <Container>
          <ScrollView style={{flex: 1}}>
            <View style={{height: 8}} />

            <Text style={{textAlign: "center", color: Colores.DetalleText}}>
              {i18n.t("status.title")}
            </Text>

            <View style={{height: 8}} />

            <SelectFechas fechas={fechas} onChange={(data) => setFecha(data)} />

            <View style={{height: 8}} />

            <TextInput
              onChangeText={(text) => setComentarios(text)}
              placeholder={i18n.t("reports.comments")}
              style={Styles.comentarios}
              multiline
              numberOfLines={6}
              maxLength={1500}
            />

            <View style={{height: 32}} />

            <View style={{alignItems: "center"}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: 200,
                }}
              >
                <BotonAccion
                  onPress={handleSubmit.bind(this)}
                  loading={loading}
                >
                  <Text style={{fontSize: 18, color: "white"}}>
                    {i18n.t("button.send")}
                  </Text>
                </BotonAccion>
              </View>
            </View>
          </ScrollView>
        </Container>
      </View>
    </ImageBackground>
  );
};

export default Consumer(DetalleGarantia);
