import React, {useState, useEffect} from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {useRoute, useNavigation} from "@react-navigation/native";
import {Consumer} from "../../../context";
import Request from "../../../core/api";
import Container from "../../../components/container";
import BotonAccion from "../../../components/boton/BotonAccion";
import Styles from "../../../styles/screens/DetalleStyle";
import Colores from "../../../styles/colores";
import {useLanguageContext} from "../../../context/lang";

const request = new Request();
const reviews = ["Muy mala", "Mala", "Regular", "Buena", "Muy buena"];
const maxRating = reviews.length;

const RatingInput = ({value, onChange}) => {
  const rating = Math.max(1, Math.min(maxRating, Number(value) || maxRating));
  const review = reviews[rating - 1];

  return (
    <View style={{alignItems: "center"}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {reviews.map((label, index) => {
          const starValue = index + 1;
          const selected = starValue <= rating;

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityLabel={`${label}. ${starValue} de ${maxRating}`}
              accessibilityState={{selected: starValue === rating}}
              onPress={() => onChange(starValue)}
              style={{paddingHorizontal: 4, paddingVertical: 4}}
            >
              <FontAwesome
                name={selected ? "star" : "star-o"}
                size={30}
                color={selected ? Colores.ratingColor : "#BFBFBF"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <Text
        style={{
          marginTop: 8,
          fontSize: 18,
          textAlign: "center",
          color: Colores.ratingColor,
        }}
      >
        {review}
      </Text>
    </View>
  );
};

const DetalleValoracion = ({context}) => {
  const {locale, i18n} = useLanguageContext();
  const translate = locale === "en";
  const [info, setInfo] = useState({});
  const [respuesta, setRespuesta] = useState(null);
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(5);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const {data} = route.params;
    if (data) {
      setInfo(data);
      setRespuesta(data.Reparado || null);
      setComentario(data.ComentarioReparacion || "");
      setValoracion(Number(data.Valoracion) || 5);
    }
  }, [route.params]);

  function ratingCompleted(rating) {
    setValoracion(rating);
  }

  async function handleSubmit() {
    setLoading(true);

    if (respuesta == null) {
      setLoading(false);
      Alert.alert(null, i18n.t("rating.errorSelect"));
      return;
    }

    const data = {
      IdSolicitud: info.IdSolicitud,
      Reparado: respuesta,
      ComentarioReparacion: comentario,
      Valoracion: valoracion,
    };

    const response = await request.post(
      "/app/garantias/update/valoracion",
      data
    );

    if (response.error) {
      Alert.alert(null, i18n.t("rating.errorSave"));
    }

    if (response.guardado) {
      await context.reloadReportes(translate);
      Alert.alert(null, i18n.t("rating.thanks2"));
      navigation.goBack();
    }

    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../../../../assets/background.jpg")}
      style={{flex: 1, height: "100%"}}
    >
      <View style={Styles.backGround}>
        <Container>
          <ScrollView style={{flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                color: Colores.DetalleText,
              }}
            >
              ¿Quedó satisfecho con la reparación?
            </Text>

            <View style={{height: 16}} />

            <Text style={{textAlign: "justify", color: Colores.DetalleText}}>
              SI la respuesta es SI, por favor valore nuestro servicio de
              atención al cliente. En caso de que No, por favor indíquenos el
              motivo y agendaremos otra cita.
            </Text>

            <View style={{height: 16}} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{width: 100, padding: 5}}>
                <Button
                  title="Si"
                  color={respuesta == true ? "#B29360" : "#BFBFBF"}
                  onPress={() => setRespuesta(true)}
                />
              </View>
              <View style={{width: 100, padding: 5}}>
                <Button
                  title="No"
                  color={respuesta == false ? "#B29360" : "#BFBFBF"}
                  onPress={() => setRespuesta(false)}
                />
              </View>
            </View>

            <View style={{height: 16}} />

            <TextInput
              value={comentario}
              placeholder={i18n.t("reports.comments")}
              style={Styles.comentarios}
              multiline
              numberOfLines={6}
              maxLength={1500}
              onChangeText={(text) => setComentario(text)}
            />

            <View style={{height: 32}} />

            <RatingInput value={valoracion} onChange={ratingCompleted} />

            <View style={{height: 32}} />

            {!info.Valoracion ? (
              <View style={{flexDirection: "row", justifyContent: "center"}}>
                <BotonAccion
                  onPress={handleSubmit.bind(this)}
                  loading={loading}
                >
                  <Text style={{fontSize: 18, color: "white"}}>
                    {i18n.t("button.send")}
                  </Text>
                </BotonAccion>
              </View>
            ) : null}
          </ScrollView>
        </Container>
      </View>
    </ImageBackground>
  );
};

export default Consumer(DetalleValoracion);
