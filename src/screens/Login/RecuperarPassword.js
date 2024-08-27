import React, {useState} from "react";
import {
  Alert,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Image,
} from "react-native";
import Request from "../../core/api";
import Container from "../../components/container";
import BotonAccion from "../../components/boton/BotonAccion";
import LoginStyle from "../../styles/screens/LoginStyle";
import InputStyles from "../../styles/inputs";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function RecuperarPassword({navigation}) {
  const {i18n} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const [correo, setCorreo] = useState("");

  async function recuperarPassword() {
    setLoading(true);

    if (!correo) {
      Alert.alert(null, i18n.t("recoverPassword.invalidEmail"));
      setLoading(false);
      return;
    }

    const data = {
      Email: correo,
    };

    const response = await request.post("/app/users/recuperar/password", data);

    if (response.error) {
      Alert.alert(
        null,
        i18n.t("apiResponse.recoverPassword2") ||
          i18n.t("recoverPassword.error")
      );
    }

    if (response.sended) {
      Alert.alert(
        null,
        i18n.t("apiResponse.recoverPassword") || i18n.t("recoverPassword.sent")
      );
      navigation.goBack();
    }

    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={{flex: 1, resizeMode: "contain", justifyContent: "center"}}
    >
      <View style={LoginStyle.backGround}>
        <ScrollView
          keyboardDismissMode="on-drag"
          style={{height: "100%", width: "100%"}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <View style={LoginStyle.loginView}>
              <Image
                source={require("../../../assets/logo.png")}
                style={{width: 300, height: 300}}
              />
              <View style={{height: 16}} />
              <TextInput
                placeholder={i18n.t("recoverPassword.email")}
                placeholderTextColor="#eaeaea"
                style={InputStyles.LoginUsername}
                ref={(input) => (inputUsername = input)}
                returnKeyType="go"
                onChangeText={(text) => setCorreo(text)}
              />
              <View style={{height: 16}} />
              <View style={{width: 300}}>
                <BotonAccion
                  onPress={recuperarPassword.bind(this)}
                  loading={loading}
                >
                  <Text style={{fontSize: 18, color: "white"}}>
                    {i18n.t("button.send")}
                  </Text>
                </BotonAccion>
              </View>
              <View style={{height: 24}} />
              <View style={{width: 300}}>
                <BotonAccion onPress={() => navigation.goBack()}>
                  <Text style={{fontSize: 18, color: "white"}}>
                    {i18n.t("button.back")}
                  </Text>
                </BotonAccion>
              </View>
            </View>
          </Container>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default RecuperarPassword;
