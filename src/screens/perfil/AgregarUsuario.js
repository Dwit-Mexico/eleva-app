import React, {useState, useEffect, useRef} from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {Consumer} from "../../context";
import {useRoute, useNavigation} from "@react-navigation/native";
import Request from "../../core/api";
import Container from "../../components/container";
import SelectUnidad from "../../components/select-unidad/SelectUnidad";
import BotonAccion from "../../components/boton/BotonAccion";
import StylesInputs from "../../styles/inputs";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function AgregarUsuario() {
  const {i18n} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const [unidades, setUnidades] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [unidad, setUnidad] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  let inputNombre = useRef();
  let inputApellidos = useRef();
  let inputCorreo = useRef();
  let inputTelefono = useRef();

  function validarCampo(campo, mensaje) {
    if (!campo) {
      Alert.alert("", mensaje);
      setLoading(false);
      return false;
    }
    return true;
  }

  function validarEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      Alert.alert(null, i18n.t("addUser.invalidEmail"));
      setLoading(false);
      return false;
    } else {
      return true;
    }
  }

  async function agregarUsuario() {
    setLoading(true);

    if (!validarCampo(unidad, i18n.t("addUser.invalidUnit"))) {
      return;
    }
    if (!validarCampo(nombre, i18n.t("addUser.invalidName"))) {
      return;
    }
    if (!validarCampo(apellidos, i18n.t("addUser.invalidLastName"))) {
      return;
    }
    if (!validarEmail(correo)) {
      return;
    }

    const data = {
      Nombre: nombre,
      Apellidos: apellidos,
      Email: correo,
      Telefono: telefono,
      IdUnidad: unidad,
    };

    const response = await request.post("/app/users/create", data);

    if (response.error) {
      Alert.alert(
        null,
        i18n.t("apiResponse.addUser") || i18n.t("addUser.error")
      );
    }

    if (response.created) {
      Alert.alert(null, i18n.t("addUser.added"));
      navigation.goBack();
    } else {
      Alert.alert(
        null,
        i18n.t("apiResponse.addUser") || i18n.t("addUser.error")
      );
    }

    setLoading(false);
  }

  if (route.params) {
    useEffect(() => {
      let {unidades} = route.params;
      if (unidades) {
        unidades = unidades.map((unidad) => {
          return {id: unidad.IdUnidad, name: unidad.Numero};
        });
        setUnidades(unidades);
      }
    }, [route.params]);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <Container>
          <ScrollView>
            <View>
              <Text>{i18n.t("addUser.unit")}</Text>
              <SelectUnidad
                unidades={unidades}
                onChange={(option) => setUnidad(option)}
              />
            </View>
            <View style={{height: 8}} />
            <View>
              <Text>{i18n.t("addUser.name")}</Text>
              <TextInput
                value={nombre}
                style={StylesInputs.inputNormal}
                onChangeText={(text) => setNombre(text)}
                returnKeyType="next"
                ref={(ref) => (inputNombre = ref)}
                onSubmitEditing={() => inputApellidos.focus()}
              />
            </View>
            <View>
              <Text>{i18n.t("addUser.lastName")}</Text>
              <TextInput
                value={apellidos}
                style={StylesInputs.inputNormal}
                onChangeText={(text) => setApellidos(text)}
                returnKeyType="next"
                ref={(ref) => (inputApellidos = ref)}
                onSubmitEditing={() => inputCorreo.focus()}
              />
            </View>
            <View>
              <Text>{i18n.t("addUser.email")}</Text>
              <TextInput
                value={correo}
                style={StylesInputs.inputNormal}
                onChangeText={(text) => setCorreo(text)}
                returnKeyType="next"
                ref={(ref) => (inputCorreo = ref)}
                onSubmitEditing={() => inputTelefono.focus()}
              />
            </View>
            <View style={{height: 8}} />
            <View>
              <Text>{i18n.t("addUser.phone")}</Text>
              <TextInput
                value={telefono}
                style={StylesInputs.inputNormal}
                onChangeText={(text) => setTelefono(text)}
                returnKeyType="go"
                ref={(ref) => (inputTelefono = ref)}
                onSubmitEditing={agregarUsuario.bind(this)}
              />
            </View>
            <View style={{height: 8}} />
            <BotonAccion onPress={agregarUsuario.bind(this)} loading={loading}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {i18n.t("button.add")}
              </Text>
            </BotonAccion>
          </ScrollView>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Consumer(AgregarUsuario);
