import React, {useState} from "react";
import {Alert, ImageBackground} from "react-native";
import Request from "../../core/api";
import Form from "../../components/forms/RecoverPasswordForm";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

export default function RecoverPassword({navigation}) {
  const {i18n} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    setLoading(true);
    if (!email) {
      Alert.alert(null, i18n.t("recoverPassword.invalidEmail"));
      setLoading(false);
      return;
    }
    const data = {
      Email: email,
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
      style={{flex: 1, resizeMode: "contain"}}
    >
      <Form
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isloading={loading}
        navigation={navigation}
      />
    </ImageBackground>
  );
}
